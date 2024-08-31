import { IProduct } from "../../types/types";
import { ensureElement } from "../../utils/utils";
import { BaseView } from "../base/view";
import { categoriesStyles, CDN_URL } from "../../utils/constants";

export class ProductCard extends BaseView<IProduct> {
  card_id: string;
  card_title: HTMLElement;
  card_price: HTMLElement;
  card_image: HTMLImageElement | null;
  card_category: HTMLElement | null;
  card_description: HTMLElement | null;
  card_basket_index: HTMLElement | null;
  card_button: HTMLButtonElement | null;

  constructor(container: HTMLElement, callback?: () => void) {
    super(container);
    this.card_title = ensureElement<HTMLElement>('.card__title', container);
    this.card_price = ensureElement<HTMLElement>('.card__price', container);
    this.card_image = container.querySelector('.card__image');
    this.card_category = container.querySelector('.card__category');
    this.card_description = container.querySelector('.card__text');
    this.card_button = container.querySelector('.card__button');
    this.card_basket_index = container.querySelector('.basket__item-index');

    if (callback) {
      if (this.card_button) {
        this.card_button.addEventListener('click', callback);
      }
      else { 
        this.container.addEventListener('click', callback);
      }
    }
  }

  set title(value: string) {
    this.setText(this.card_title, value); 
  }

  set price(value: number | null) {
    if (value) {
      this.setText(this.card_price, `${value} синапсов`); 
    } else {
      this.setText(this.card_price, 'Бесценно');
    }

    if (this.card_button && value === null) {
      this.card_button.disabled = true;
    }
  }

  set image(value: string) {
    if (this.card_image) {
      this.setImage(this.card_image, `${CDN_URL}${value}`, this.card_title.textContent);
    }
  }

  set category(value: string) {
    if (this.card_category) {
      this.setText(this.card_category, value);
      this.card_category.classList.remove(...this.card_category.classList);
      this.card_category.classList.add('card__category');
      this.card_category.classList.add(categoriesStyles[value]);
    }
  }

  set description(value: string) {
    if (this.card_description) {
      this.setText(this.card_description, value);
    }
  }

  set id(value: string) {
    this.card_id = value;
  }

  set basket_index(value: number) {
    this.setText(this.card_basket_index, value.toString());
  }

  toggleButtonState(value: boolean) {
    if (this.card_button && value ) {
      this.card_button.setAttribute("disabled", "disabled");
    }
  }
} 
