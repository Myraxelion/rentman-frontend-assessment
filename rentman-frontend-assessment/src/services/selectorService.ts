import response from "../data/response.json";
import type { FolderMap, ItemMap } from "../types/selector.types";
import { stringSort } from "../utils/sort";

interface SelectorData {
  folders: FolderMap;
  items: ItemMap;
}

interface ResponseData {
  folders: {
    columns: [string, string, string];
    data: FolderData[];
  };
  items: {
    columns: [string, string, string];
    data: ItemData[];
  };
}

type FolderData = [number, string, number | null];
type ItemData = [number, string, number];

export function fetchItemSelectorData(): Promise<SelectorData> {
  return Promise.resolve(response).then((res) =>
    mapItemSelectorData(res as ResponseData),
  );
}

function mapItemSelectorData(data: ResponseData): SelectorData {
  const folders: FolderMap = {};
  const items: ItemMap = {};

  const sortedFoldersData = data.folders.data.sort(
    (a: FolderData, b: FolderData) => stringSort(a[1], b[1]),
  );
  const sortedItemsData = data.items.data.sort((a: ItemData, b: ItemData) =>
    stringSort(a[1], b[1]),
  );

  console.log("sortedFoldersData", sortedFoldersData);
  console.log("sortedItemsData", sortedItemsData);

  data.folders.data.forEach((folderData: FolderData) => {
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

  data.items.data.forEach((itemData: ItemData) => {
    items[itemData[0]] = {
      id: itemData[0],
      title: itemData[1],
      folderId: itemData[2],
      isChecked: false,
    };
  });

  sortedItemsData.forEach((itemData: ItemData) => {
    const parentFolder = folders[itemData[2]];
    if (parentFolder) {
      parentFolder.childItemIds.push(itemData[0]);
    }
  });

  sortedFoldersData.forEach((folderData: FolderData) => {
    if (folderData[2] === null) {
      return;
    }
    const parentFolder = folders[folderData[2]];
    if (parentFolder) {
      parentFolder.childFolderIds.push(folderData[0]);
    }
  });

  return {
    folders,
    items,
  };
}
