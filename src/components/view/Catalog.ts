import { BaseView } from "../base/view";
import { IProduct } from "../../types/types";
import { ProductCard } from "./Card";
import { IEvents } from "../../types/types";
import { ensureElement } from "../../utils/utils";
import { cloneTemplate } from "../../utils/utils";

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

export class CatalogView extends BaseView<IProduct[]> {
  protected _events: IEvents;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
  }

  render(data: IProduct[]) {
    Array.from(data).forEach((item) => {
      const card = new ProductCard(cloneTemplate(cardTemplate), () => {
        this._events.emit("catalog_selected", item);
      });
      this.container.appendChild(card.render(item));
    })
    return this.container;
  }
}