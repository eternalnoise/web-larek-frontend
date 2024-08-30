import { IBasket, IEvents } from "../../types/types";
import { BaseView } from "../base/view";
import { ensureElement } from "../../utils/utils";
import { ProductCard } from "./Card";
import { cloneTemplate } from "../../utils/utils";

const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

export class BasketOpenedView extends BaseView<IBasket> {
  container: HTMLElement;
  basketList: HTMLElement;
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
  fillBasket(basket: IBasket) {
    this.clear(this.basketList);
    basket.items.forEach((item, index) => {
      const template = cloneTemplate(basketItemTemplate);
      const card = new ProductCard(template, () => {
        this._events.emit("basket_remove", item);
      })
      card.basket_index = index + 1;
      this.basketList.appendChild(card.render(item));
    });
  }

  updateBasket(basket: IBasket) {
    this.fillBasket(basket);
    this.setText(this.totalPrice, `${basket.totalPrice} синапсов`);
    if (basket.totalPrice === 0) {
      this.checkoutButton.disabled = true;
    }
    else {
      this.checkoutButton.disabled = false;
    }
  }

  render(basket: IBasket): HTMLElement {
    this.updateBasket(basket);
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