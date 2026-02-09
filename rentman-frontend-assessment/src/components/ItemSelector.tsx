import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { Item, SelectorData } from "../types/selector.types";
import ItemCheckbox from "./ItemCheckbox";

export default function ItemSelector() {
  const [selectorData, setSelectorData] = useState<SelectorData>(
    {} as SelectorData,
  );
  const [itemData, setItemData] = useState<{ [index: number]: Item }>({});

  useEffect(() => {
    fetchItemSelectorData().then((data) => {
      setSelectorData(data);
      const itemMap: { [index: number]: Item } = {};
      data.items.forEach((item) => {
        itemMap[item.id] = item;
      });
      setItemData(itemMap);
      console.log(itemMap);
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

  return (
    <>
      <h1>Hello World!</h1>
      <ol>{itemCheckboxes}</ol>
    </>
  );
}
