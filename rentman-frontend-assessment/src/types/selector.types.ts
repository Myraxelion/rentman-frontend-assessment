interface Folder {
  id: number;
  title: string;
  parentId: number | null;
}

interface Item {
  id: number;
  title: string;
  folderId: number;
}

interface SelectorData {
  folders: Folder[];
  items: Item[];
}

export type { Folder, Item, SelectorData };
