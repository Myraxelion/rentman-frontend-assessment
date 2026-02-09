import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";
import type { SelectorData } from "../types/selector.types";

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
    </>
  );
}
