import { IEvents } from "../events";

class Page {
  constructor(container: HTMLElement, events: IEvents) {

}
  pageContainer: HTMLElement;
  events: IEvents;
  basketIconContainer: HTMLElement;

  lock();
  setCatalog(catalogContainer: HTMLElement);
}