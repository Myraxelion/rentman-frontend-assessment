import type { Folder, FolderMap, ItemMap } from "../types/selector.types";
import { useEffect, useRef } from "react";
import ItemCheckbox from "./ItemCheckbox";

export default function FolderCheckbox({
  folder,
  folderMap,
  itemMap,
  onItemClick,
  onFolderClick,
}: {
  folder: Folder;
  folderMap: FolderMap;
  itemMap: ItemMap;
  onItemClick: (id: number) => void;
  onFolderClick: (id: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && folder) {
      inputRef.current.indeterminate = folder.isIndeterminate;
    }
  }, [folder]);

  const folderCheckboxes = folder.childFolderIds.map((folderId) => {
    const folder = folderMap[folderId];
    return (
      <li key={"folder" + folder.id}>
        <FolderCheckbox
          folder={folder}
          folderMap={folderMap}
          itemMap={itemMap}
          onItemClick={onItemClick}
          onFolderClick={onFolderClick}
        />
      </li>
    );
  });

  const itemCheckboxes = folder.childItemIds.map((itemId) => {
    const item = itemMap[itemId];
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
          onChange={() => onFolderClick(folder.id)}
        />
        <label>{folder.title}</label>
      </span>
      <ol>{folderCheckboxes}</ol>
      <ol>{itemCheckboxes}</ol>
    </>
  );
}
