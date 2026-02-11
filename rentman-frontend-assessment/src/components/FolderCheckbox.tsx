import type { Folder, FolderMap, ItemMap } from "../types/selector.types";
import { useEffect, useRef, useState } from "react";
import ItemCheckbox from "./ItemCheckbox";

const UP_ARROW = String.fromCharCode(0x2303);
const DOWN_ARROW = String.fromCharCode(0x2304);

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
  const [isExpanded, setIsExpanded] = useState(true);
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
      <span className="list-item-container">
        <span>
          <input
            type="checkbox"
            checked={folder.isChecked}
            ref={inputRef}
            onChange={() => onFolderClick(folder.id)}
          />
          <label className="label text-bold">{folder.title}</label>
        </span>
        <button
          className="clear-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? UP_ARROW : DOWN_ARROW}
        </button>
      </span>
      {isExpanded && (
        <div>
          <ol>{folderCheckboxes}</ol>
          <ol>{itemCheckboxes}</ol>
        </div>
      )}
    </>
  );
}
