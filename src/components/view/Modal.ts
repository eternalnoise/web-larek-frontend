import { IModal, IEvents } from "../../types/types";
import { BaseView } from "../base/view";
import { ensureElement } from "../../utils/utils";

export class ModalView extends BaseView<IModal>{
  protected _content: HTMLElement;
  closeButton: HTMLButtonElement;
  events: IEvents;
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
    this._content = ensureElement<HTMLElement>(".modal__content", container);
    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", container);
    this.container.addEventListener("click", () => {
      this.close();
    })
    this.closeButton.addEventListener("click", () => {
      this.close();
    })
    this._content.addEventListener("click", (event) => {
      event.stopPropagation();
    })
  }
  open() {
    this.container.classList.add("modal_active");
    this.events.emit("modal_open");
  };
  close() {
    this.container.classList.remove("modal_active");
    this.clear(this._content);
    this.events.emit("modal_close");
  };

  set content(data: HTMLElement) {
    this._content.replaceChildren(data);
  }

  render(data: IModal) {
    this._content.replaceChildren(data.content);
    this.open();
    return this.container;
  }
}