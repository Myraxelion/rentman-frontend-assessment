import type { Folder, FolderMap, ItemMap } from "../types/selector.types";
import { useEffect, useRef } from "react";
import ItemCheckbox from "./ItemCheckbox";

export default function FolderCheckbox({
  folder,
  folderMap,
  itemMap,
  onItemClick,
}: {
  folder: Folder;
  folderMap: FolderMap;
  itemMap: ItemMap;
  onItemClick: (id: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && folder) {
      inputRef.current.indeterminate = folder.isIndeterminate;
    }
  }, [folder]);

  const childItems = Object.values(itemMap).filter(
    (item) => item.folderId === folder.id,
  );

  const itemCheckboxes = childItems.map((item) => {
    return (
      <li key={"item" + item.id}>
        <ItemCheckbox item={item} onCheckboxClick={onItemClick} />
      </li>
    );
  });

  return (
    <>
      <span>
        <input
          type="checkbox"
          checked={folder.isChecked}
          ref={inputRef}
          onClick={() => {}}
        />
        <label>{folder.title}</label>
      </span>
      <ol>{itemCheckboxes}</ol>
    </>
  );
}
