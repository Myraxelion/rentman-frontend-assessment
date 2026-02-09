import type { Item } from "../types/selector.types";

export default function ItemCheckbox({
  item,
  onCheckboxClick,
}: {
  item: Item;
  onCheckboxClick: (id: number) => void;
}) {
  return (
    <>
      <span>
        <input
          type="checkbox"
          checked={item.isChecked}
          onClick={() => onCheckboxClick(item.id)}
        />
        <label>{item.title}</label>
      </span>
    </>
  );
}
