import { IProduct } from "../../types/types";
import { BaseModel } from "../base/model";

export class CatalogModel extends BaseModel<IProduct[]>{
  items: IProduct[] = [];
  setProducts(items: IProduct[]) {
    this.items = items;
    this.events.emit("catalog_changed", {
      items: this.items
    });
  }
}