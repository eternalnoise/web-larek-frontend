import { BaseView } from "../base/view";
import { IEvents } from "../../types/types";


export class CatalogView extends BaseView<HTMLElement[]> {
  protected _events: IEvents;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this._events = events;
  }

  render(cards: HTMLElement[]) {
    cards.forEach((card) => {
      this.container.appendChild(card);
    })
    return this.container;
  }
}