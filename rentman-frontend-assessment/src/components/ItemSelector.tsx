import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { ItemMap, FolderMap } from "../types/selector.types";
import ItemCheckbox from "./ItemCheckbox";

export default function ItemSelector() {
  const [folderData, setFolderData] = useState<FolderMap>({});
  const [itemData, setItemData] = useState<ItemMap>({});

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

  const itemCheckboxes = Object.values(itemData).map((item) => {
    return (
      <li key={"item" + item.id}>
        <ItemCheckbox item={item} onCheckboxClick={handleItemClick} />
      </li>
    );
  });

  console.log("itemData", itemData);
  console.log("folderData", folderData);

  return (
    <>
      <h1>Hello World!</h1>
      <ol>{itemCheckboxes}</ol>
    </>
  );
}
