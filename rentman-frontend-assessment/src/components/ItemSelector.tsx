import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { SelectorData } from "../types/selector.types";
import Item from "./Item";

export default function ItemSelector() {
  const [selectorData, setSelectorData] = useState<SelectorData>(
    {} as SelectorData,
  );

  useEffect(() => {
    fetchItemSelectorData().then((data) => {
      setSelectorData(data);
    });
  }, []);

  console.log(selectorData);

  return (
    <>
      <h1>Hello World!</h1>
      {selectorData.items && selectorData.items.length > 0 && (
        <Item
          item={selectorData.items[0]}
          isChecked={true}
          onCheckboxClick={() => {
            // TODO: implement checkbox click handler
            console.log("clicked!");
          }}
        />
      )}
    </>
  );
}
