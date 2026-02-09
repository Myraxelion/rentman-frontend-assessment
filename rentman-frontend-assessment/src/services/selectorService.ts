/* eslint-disable @typescript-eslint/no-explicit-any */
import response from "../data/response.json";
import type { FolderMap, ItemMap } from "../types/selector.types";

interface SelectorData {
  folders: FolderMap;
  items: ItemMap;
}

export function fetchItemSelectorData(): Promise<SelectorData> {
  return Promise.resolve(response).then((res) => mapItemSelectorData(res));
}

function mapItemSelectorData(data: any): SelectorData {
  const folders: FolderMap = {};
  const items: ItemMap = {};

  data.folders.data.forEach((folderData: any) => {
    folders[folderData[0]] = {
      id: folderData[0],
      title: folderData[1],
      parentId: folderData[2],
      childFolderIds: [],
      childItemIds: [],
      isChecked: false,
      isIndeterminate: false,
    };
  });

  data.items.data.forEach((itemData: any) => {
    items[itemData[0]] = {
      id: itemData[0],
      title: itemData[1],
      folderId: itemData[2],
      isChecked: false,
    };
  });

  Object.values(items).forEach((item) => {
    const parentFolder = folders[item.folderId];
    if (parentFolder) {
      parentFolder.childItemIds.push(item.id);
    }
  });

  Object.values(folders).forEach((folder) => {
    if (folder.parentId === null) {
      return;
    }
    const parentFolder = folders[folder.parentId];
    if (parentFolder) {
      parentFolder.childFolderIds.push(folder.id);
    }
  });

  return {
    folders,
    items,
  };
}
