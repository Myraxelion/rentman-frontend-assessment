import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { ItemMap, FolderMap, Folder } from "../types/selector.types";
import FolderCheckbox from "./FolderCheckbox";

export default function ItemSelector() {
  const [folderData, setFolderData] = useState<FolderMap>({});
  const [itemData, setItemData] = useState<ItemMap>({});
  const topFolders: Folder[] = Object.values(folderData).filter(
    (folder) => folder.parentId === null,
  );

  useEffect(() => {
    fetchItemSelectorData().then((data) => {
      setItemData(data.items);
      setFolderData(data.folders);
    });
  }, []);

  function handleItemClick(itemId: number): void {
    const newItemData = {
      ...itemData,
      [itemId]: { ...itemData[itemId], isChecked: !itemData[itemId].isChecked },
    };
    setItemData(newItemData);
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

  console.log("itemData", itemData);
  console.log("folderData", folderData);
  console.log("topFolders", topFolders);

  return (
    <>
      <h1>Hello World!</h1>
      <ol>{folderCheckboxes}</ol>
    </>
  );
}
