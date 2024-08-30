import { IEvents } from "../../types/types";
import { BaseView } from "../base/view";
import { ensureElement } from "../../utils/utils";


interface ISuccess {
  successPrice: number;
}

export class Success extends BaseView<ISuccess> {
  _closeButton: HTMLButtonElement;
  _message: HTMLElement;
  _events: IEvents;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
    this._closeButton = ensureElement<HTMLButtonElement>("button", container);
    this._message = ensureElement<HTMLElement>(".order-success__description", container);
    this._closeButton.addEventListener("click", () => {
      this._events.emit("success_close");
    });
  }

  set successPrice(value: string) {
    this.setText(this._message, `Списано ${value} синапсов`);
  }
}