import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { ItemMap, FolderMap, Folder } from "../types/selector.types";
import FolderCheckbox from "./FolderCheckbox";
import { stringSort } from "../utils/sort";

export default function ItemSelector() {
  const [folderData, setFolderData] = useState<FolderMap>({});
  const [itemData, setItemData] = useState<ItemMap>({});
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    () => new Set([]),
  );
  const topFolders: Folder[] = Object.values(folderData)
    .filter((folder) => folder.parentId === null)
    .sort((a, b) => stringSort(a.title, b.title));

  useEffect(() => {
    fetchItemSelectorData().then((data) => {
      setItemData(data.items);
      setFolderData(data.folders);
    });
  }, []);

  function handleItemClick(itemId: number): void {
    const item = itemData[itemId];
    updateUpstreamFolders(item.folderId, item.isChecked ? -1 : 1, {
      ...folderData,
    });

    const newItemData = {
      ...itemData,
      [itemId]: { ...itemData[itemId], isChecked: !itemData[itemId].isChecked },
    };
    setItemData(newItemData);
    updateSelectedItemIds(itemId);
  }

  function updateSelectedItemIds(
    itemId: number | null,
    updatedItemMap: ItemMap = itemData,
  ): void {
    let newSelectedItemIds = new Set<number>();
    if (itemId === null) {
      // update everything
      Object.values(updatedItemMap).forEach((item) => {
        if (item.isChecked) {
          newSelectedItemIds.add(item.id);
        }
      });
    } else {
      newSelectedItemIds = new Set(selectedItemIds);
      if (newSelectedItemIds.has(itemId)) {
        newSelectedItemIds.delete(itemId);
      } else {
        newSelectedItemIds.add(itemId);
      }
    }

    setSelectedItemIds(newSelectedItemIds);
  }

  function handleFolderClick(folderId: number): void {
    const folder = folderData[folderId];
    const folderDataCopy = structuredClone(folderData);
    const itemDataCopy = structuredClone(itemData);
    let delta = 0;
    if (folder.isChecked && folder.checkedItemCount === folder.totalItemCount) {
      delta = -folder.checkedItemCount;
      updateFolderAndDownstream(folderId, false, folderDataCopy, itemDataCopy);
    } else {
      delta = folder.totalItemCount - folder.checkedItemCount;
      updateFolderAndDownstream(folderId, true, folderDataCopy, itemDataCopy);
    }

    updateUpstreamFolders(folder.parentId, delta, folderDataCopy);
    setItemData(itemDataCopy);
    updateSelectedItemIds(null, itemDataCopy);
  }

  function updateUpstreamFolders(
    folderId: number | null,
    delta: number,
    updatedFolderData: FolderMap,
  ): void {
    if (folderId === null) {
      setFolderData(updatedFolderData);
      return;
    }
    const folder = folderData[folderId];
    const newCheckedItemCount = folder.checkedItemCount + delta;

    let isChecked = folder.isChecked;
    let isIndeterminate = folder.isIndeterminate;

    if (newCheckedItemCount === folder.totalItemCount) {
      isChecked = true;
      isIndeterminate = false;
    } else if (newCheckedItemCount === 0) {
      isChecked = false;
      isIndeterminate = false;
    } else {
      isChecked = false;
      isIndeterminate = true;
    }

    updatedFolderData = {
      ...updatedFolderData,
      [folderId]: {
        ...folder,
        checkedItemCount: newCheckedItemCount,
        isChecked,
        isIndeterminate,
      },
    };

    updateUpstreamFolders(folder.parentId, delta, updatedFolderData);
  }

  function updateFolderAndDownstream(
    folderId: number,
    shouldCheck: boolean,
    updatedFolderData: FolderMap,
    updatedItemData: ItemMap,
  ): void {
    const folder = folderData[folderId];

    updatedFolderData[folderId] = {
      ...folder,
      checkedItemCount: shouldCheck ? folder.totalItemCount : 0,
      isChecked: shouldCheck,
      isIndeterminate: false,
    };

    folder.childItemIds.forEach((itemId) => {
      updatedItemData[itemId].isChecked = shouldCheck;
    });

    folder.childFolderIds.forEach((folderId) => {
      updateFolderAndDownstream(
        folderId,
        shouldCheck,
        updatedFolderData,
        updatedItemData,
      );
    });
  }

  function clearSelection(): void {
    const folderDataCopy = structuredClone(folderData);
    const itemDataCopy = structuredClone(itemData);
    topFolders.forEach((folder) => {
      updateFolderAndDownstream(folder.id, false, folderDataCopy, itemDataCopy);
    });

    setFolderData(folderDataCopy);
    setItemData(itemDataCopy);
    updateSelectedItemIds(null, itemDataCopy);
  }

  const folderCheckboxes = topFolders.map((folder) => {
    return (
      <li key={"folder" + folder.id}>
        <FolderCheckbox
          folder={folder}
          folderMap={folderData}
          itemMap={itemData}
          onItemClick={handleItemClick}
          onFolderClick={handleFolderClick}
        />
      </li>
    );
  });

  return (
    <div className="item-selector-container">
      <div className="list-container">
        <ol>{folderCheckboxes}</ol>
      </div>
      <p className="label">
        Selected item ids: {Array.from(selectedItemIds).join(", ")}
      </p>
      <button className="selection-button" onClick={clearSelection}>
        Clear Selection
      </button>
    </div>
  );
}
