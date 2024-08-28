import { IProduct } from "../../types/types";
import { BaseModel } from "../base/model";

export class BasketModel extends BaseModel<IProduct> {
  items: IProduct[] = [];
  itemsNumber: number = 0;
  totalPrice: number = 0;

  addProduct(product: IProduct) {
    this.items.push(product);
    this.itemsNumber++;
  }
  removeProduct(product: IProduct) {
    this.items.filter((item) => item.id !== product.id);
    this.itemsNumber--;
  }

  getTotalPrice(): number { 
    this.totalPrice = 0;  
    this.items.forEach((item) => {
      this.totalPrice += item.price;
    });
    return this.totalPrice;
}

  clear() { 
    this.items = [];
    this.itemsNumber = 0;
    this.totalPrice = 0;
  }
}
