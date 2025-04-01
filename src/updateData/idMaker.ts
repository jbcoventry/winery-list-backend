import { Winery } from "../types";

export default function idMaker(data: Winery[]) {
  function createId(string: string, index: number) {
    const filteredArray = string.toLowerCase().match(/[0-9]|[a-z]/g);
    return filteredArray ? filteredArray.join("") : index.toString();
  }
  return data.map((item, index) => createId(item.title, index));
}
