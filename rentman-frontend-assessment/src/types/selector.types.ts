interface Folder {
  id: number;
  title: string;
  parentId: number | null;
  childFolderIds: number[];
  childItemIds: number[];
  isChecked: boolean;
  isIndeterminate: boolean;
}

interface Item {
  id: number;
  title: string;
  folderId: number;
  isChecked: boolean;
}

interface FolderMap {
  [index: number]: Folder;
}

interface ItemMap {
  [index: number]: Item;
}

export type { Folder, Item, FolderMap, ItemMap };
