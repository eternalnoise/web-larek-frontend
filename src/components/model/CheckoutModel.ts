import { IProduct, PaymentOption } from "../../types/types";
import { BaseModel } from "../base/model";
import { ICheckoutDetails } from "../../types/types";
import { IFormValidation } from "../../types/types";

export class CheckoutModel extends BaseModel<ICheckoutDetails> {
  payment: PaymentOption = undefined;
  address: string;
  email: string;
  phone: string;
  totalPrice: number;
  items: IProduct[] = [];
  validationData: IFormValidation = {
    valid: false,
    errors: ''
  };

  validateDeliveryForm(): IFormValidation {
    this.validationData.valid = this.address !== '' && this.payment !== undefined;
    if (!this.validationData.valid) {
      this.validationData.errors = 'Заполните все обязательные поля';
    }
    else {
      this.validationData.errors = '';
    }
    return this.validationData;
  }

  validateContactsForm(): IFormValidation {
    this.validationData.valid = this.email !== '' && this.phone !== '';
    if (!this.validationData.valid) {
      this.validationData.errors = 'Заполните все обязательные поля';
    }
    else {
      this.validationData.errors = '';
    }
    return this.validationData;
  }

  getOrderDetails(): ICheckoutDetails {
    return {
      payment: this.payment,     
      address: this.address,
      email: this.email,
      phone: this.phone,
      total: this.totalPrice,
      items: this.items.map((item) => item.id)
    }
  }

  clear() {
    this.payment = undefined;
    this.address = '';
    this.email = '';
    this.phone = '';
    this.totalPrice = 0;
    this.items = [];
  };
}