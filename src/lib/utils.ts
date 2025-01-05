import Decimal from "decimal.js-light";
import { ListItem } from "../components/ShoppingList";

export const getItemsFromJsonString = (jsonString: string) => {
  try {
    const array = JSON.parse(jsonString);
    if (!Array.isArray(array)) {
      return [];
    }
    return array.map((item) => {
      const listItem: ListItem = {
        name: item.name,
        price: item.price ? new Decimal(item.price) : undefined,
        quantity: item.quantity,
      };
      return listItem;
    });
  } catch (e) {
    return [];
  }
};

export const getJsonStringFromItems = (items: ListItem[]) => {
  const itemsParsed = items.map((item) => ({
    name: item.name,
    price: item.price?.toNumber(),
    quantity: item.quantity,
  }));
  return JSON.stringify(itemsParsed);
};
