import { IBasket, IEvents, IBasketView } from "../../types/types";
import { BaseView } from "../base/view";
import { ensureElement } from "../../utils/utils";


export class BasketOpenedView extends BaseView<IBasketView> {
  container: HTMLElement;
  basketList: HTMLElement;
  basketListEmpty: HTMLElement;
  checkoutButton: HTMLButtonElement;
  totalPrice: HTMLElement;
  protected _events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
    this.checkoutButton = ensureElement<HTMLButtonElement>(".button", container);
    this.totalPrice = ensureElement<HTMLElement>(".basket__price", container);
    this.basketList = ensureElement<HTMLElement>(".basket__list", container);
    this.checkoutButton.addEventListener("click", () => {
      this._events.emit("checkout_proceed");
    });
  }
  fillBasket(basketItems: HTMLElement[]) {
    this.clear(this.basketList);
    basketItems.forEach((item) => {
      this.basketList.appendChild(item);
    });
  }

  updateBasket(data: IBasketView) {
    this.fillBasket(data.basketList);
    this.setText(this.totalPrice, `${data.totalPrice} синапсов`);
    if (data.totalPrice === 0) {
      this.checkoutButton.disabled = true;
    }
    else {
      this.checkoutButton.disabled = false;
    }
  }

  render(data: IBasketView): HTMLElement {
    this.updateBasket(data);
    return this.container;
  }
}

export class BasketIconView extends BaseView<IBasket> {
  basket_button: HTMLElement;
  basket_counter: HTMLElement;
  protected _events: IEvents
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
    this.basket_button = ensureElement<HTMLButtonElement>('.header__basket', container);
    this.basket_counter = ensureElement<HTMLElement>('.header__basket-counter', container);
    this.basket_button.addEventListener('click', () => {
      this._events.emit("basket_open");
    })
  }

  set counter(value: number) {
    this.setText(this.basket_counter, value.toString());
  }

}