/* eslint-disable @typescript-eslint/no-explicit-any */
import response from "../data/response.json";
import type { Folder, Item, SelectorData } from "../types/selector.types";

export function fetchItemSelectorData(): Promise<SelectorData> {
  return Promise.resolve(response).then((res) => mapItemSelectorData(res));
}

function mapItemSelectorData(data: any): SelectorData {
  const folders: Folder[] = [];
  const items: Item[] = [];

  data.folders.data.forEach((folderData: any) => {
    folders.push({
      id: folderData[0],
      title: folderData[1],
      parentId: folderData[2],
    });
  });

  data.items.data.forEach((itemData: any) => {
    items.push({
      id: itemData[0],
      title: itemData[1],
      folderId: itemData[2],
      isChecked: false,
    });
  });

  return {
    folders,
    items,
  };
}
