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
      <span className="list-item-container">
        <span>
          <input
            type="checkbox"
            checked={item.isChecked}
            onChange={() => onCheckboxClick(item.id)}
          />
          <label className="label">{item.title}</label>
        </span>
      </span>
    </>
  );
}
