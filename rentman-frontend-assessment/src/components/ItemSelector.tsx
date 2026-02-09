import { useEffect, useState } from "react";
import {
  fetchItemSelectorData,
  type SelectorData,
} from "../services/selectorService";

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
