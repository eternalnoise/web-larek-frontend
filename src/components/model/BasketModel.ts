import { IEvents, IProduct } from "../../types/types";
import { BaseModel } from "../base/model";

export class BasketModel extends BaseModel<IProduct[]> {
  items: IProduct[];
  protected _events: IEvents;

  constructor(items: IProduct[] = [], events: IEvents) {
    super(items, events);
    this.items = items;
    this._events = events;
  }

  addProduct(product: IProduct) {
    this.items.push(product);
    product.inBasket = true;
    this._events.emit("basket_changed");
  }
  removeProduct(product: IProduct) {
    this.items = this.items.filter((item) => item.id !== product.id);
    product.inBasket = false;
    this._events.emit("basket_changed");
  }

  get totalPrice(): number { 
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  get itemsNumber(): number {
    return this.items.length;
  }

  clear() { 
    this.items.map((item) => this.removeProduct(item));
  }

}
