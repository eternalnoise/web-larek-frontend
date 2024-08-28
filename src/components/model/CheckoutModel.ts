import { PaymentOption } from "../../types/types";
import { BaseModel } from "../base/model";
import { ICheckoutDetails } from "../../types/types";

export class CheckoutModel extends BaseModel<ICheckoutDetails> {
  payment: PaymentOption = undefined;
  address: string = '';
  email: string = '';
  phoneNumber: string = '';
  price: number = 0;
  items: string[] = [];
  validateDeliveryForm(): boolean {
    return this.address !== '' && this.payment !== undefined;
  }

  validateContactForm(): boolean {
    return this.email !== '' && this.phoneNumber !== '';
  }

  getPlaceOrderRequest(): string {
    return JSON.stringify({
      payment: this.payment,     
      address: this.address,
      email: this.email,
      phone: this.phoneNumber,
      total: this.price,
      items: JSON.stringify(this.items)
    })
  }

  clear() {
    this.payment = undefined;
    this.address = '';
    this.email = '';
    this.phoneNumber = '';
    this.price = 0;
    this.items = [];
  };
}