import { FormView } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../types/types";
import { PaymentOption } from "../../types/types";

export interface IDeliveryFormData {
  payment: PaymentOption;
  address: string;
}

export class DeliveryDetails extends FormView{
  protected _paymentCashButton: HTMLElement;
  protected _paymentOnlineButton: HTMLElement;
  protected _paymentMethod: PaymentOption;
  protected _addressField: HTMLInputElement;
  protected _events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._paymentCashButton = ensureElement<HTMLElement>('button[name="cash"]', container);
    this._paymentOnlineButton = ensureElement<HTMLElement>('button[name="card"]', container);
    this._addressField = ensureElement<HTMLInputElement>('input[name="address"]', container);
    this._events = events;

    this._paymentCashButton.addEventListener("click", () => {
      this._paymentMethod = "При получении";
      this._paymentCashButton.classList.add("button_alt-active");
      this._paymentOnlineButton.classList.remove("button_alt-active");
      this._events.emit("deliveryForm_changed", this.formData);
    });

    this._paymentOnlineButton.addEventListener("click", () => {
      this._paymentMethod = "Онлайн";
      this._paymentOnlineButton.classList.add("button_alt-active");
      this._paymentCashButton.classList.remove("button_alt-active");
      this._events.emit("deliveryForm_changed", this.formData);
    });

    this._addressField.addEventListener("input", () => {
      this._events.emit("deliveryForm_changed", this.formData);
    });

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this._events.emit("deliveryForm_submit", this.formData);
    })
  }

  get formData(): IDeliveryFormData {
    return {
      payment: this._paymentMethod,
      address: this._addressField.value
    }
  }
}