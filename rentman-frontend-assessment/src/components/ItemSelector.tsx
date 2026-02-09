import { useEffect, useState } from "react";
import { fetchItemSelectorData } from "../services/selectorService";

export default function ItemSelector() {
  const [selectorData, setSelectorData] = useState<any>(null);

  useEffect(() => {
    fetchItemSelectorData().then((data) => {
      setSelectorData(data);
      console.log(selectorData);
    });
  });

  return (
    <>
      <h1>Hello World!</h1>
    </>
  );
}
