import { FormView } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../types/types";


export interface IContactsFormData {
  phone: string;
  email: string;
}
export class ContactsDetails extends FormView {
  protected _phoneField: HTMLInputElement;
  protected _emailField: HTMLInputElement;
  protected _events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._phoneField = ensureElement<HTMLInputElement>('input[name="phone"]', container);
    this._emailField = ensureElement<HTMLInputElement>('input[name="email"]', container);
    this._events = events;

    this._phoneField.addEventListener("input", () => {
      this._events.emit("contactsForm_changed", this.formData);
    });

    this._emailField.addEventListener("input", () => {
      this._events.emit("contactsForm_changed", this.formData);
    });

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this._events.emit("contactsForm_submit", this.formData);
    })
  }

  get formData(): IContactsFormData {
    return {
      phone: this._phoneField.value,
      email: this._emailField.value
    }
  }
}