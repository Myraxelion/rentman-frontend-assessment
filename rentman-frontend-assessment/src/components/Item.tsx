import type { Item } from "../types/selector.types";

export default function Item({
  item,
  isChecked,
  onCheckboxClick,
}: {
  item: Item;
  isChecked: boolean;
  onCheckboxClick: () => void;
}) {
  return (
    <>
      <span>
        <input
          type="checkbox"
          checked={isChecked}
          onClick={() => onCheckboxClick()}
        />
        <label>{item.title}</label>
      </span>
    </>
  );
}
