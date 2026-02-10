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

    const newSelectedItemIds = new Set(selectedItemIds);
    if (newSelectedItemIds.has(itemId)) {
      newSelectedItemIds.delete(itemId);
    } else {
      newSelectedItemIds.add(itemId);
    }
    setSelectedItemIds(newSelectedItemIds);
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

  const folderCheckboxes = topFolders.map((folder) => {
    return (
      <li key={"folder" + folder.id}>
        <FolderCheckbox
          folder={folder}
          folderMap={folderData}
          itemMap={itemData}
          onItemClick={handleItemClick}
        />
      </li>
    );
  });

  return (
    <>
      <ol>{folderCheckboxes}</ol>
      <p>Selected item ids: {Array.from(selectedItemIds).join(", ")}</p>
    </>
  );
}
