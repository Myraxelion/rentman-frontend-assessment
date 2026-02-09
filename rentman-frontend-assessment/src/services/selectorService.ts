import response from "../data/response.json";

export function fetchItemSelectorData(): Promise<any> {
  return Promise.resolve(response);
}
