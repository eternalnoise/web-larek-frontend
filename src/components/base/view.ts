import { ensureElement } from "../../utils/utils";

export abstract class BaseView<T> {
  protected constructor(protected container: HTMLElement) {}
  setElement(query: string, value: HTMLElement) {   
    const element = this.container.querySelector(query);
    if (element) {
      element.replaceWith(value);
    }
  }

  toggleClass(element: HTMLElement, className: string, force?: boolean) { 
  
  }

  setText(element: HTMLElement, value: unknown) { 
        
  }

  setDisabled(element: HTMLElement, state: boolean) { 
    element.disabled = state;
  }

  setHidden(element: HTMLElement) {

  }   
  setVisible(element: HTMLElement) {
    element.hidden = false;
  }
  setImage(element: HTMLImageElement, src: string, alt?: string) {
    element.src = src;
    element.alt = alt;
  }

  render(data?: Partial): HTMLElement {
    
  }




}