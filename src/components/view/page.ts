import { IEvents } from "../../types/types";
import { BaseView } from "../base/view";
import { IPage } from "../../types/types";
import { ensureElement } from "../../utils/utils";

export class Page extends BaseView<IPage> {
  protected _pageContainer: HTMLElement;
  protected _events: IEvents;
  protected _basketIconContainer: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  constructor(pageContainer: HTMLElement, protected events: IEvents) {
    super(pageContainer);
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basketIconContainer = ensureElement<HTMLElement>('.header__basket');

  }

  lock() {
    this._wrapper.classList.add('page__wrapper_locked');
  };
  unlock() {
    this._wrapper.classList.remove('page__wrapper_locked');
  };
  set catalog(catalogContainer: HTMLElement) {
    this._catalog = catalogContainer;
   };

  set basketIconContainer(basketIconContainer: HTMLElement) {
    this._basketIconContainer = basketIconContainer;
  }
}