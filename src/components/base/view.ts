export abstract class BaseView<T> {
  protected constructor(protected container: HTMLElement) {}
  setElement(query: string, value: HTMLElement) {   
    const element = this.container.querySelector(query);
    if (element) {
      element.replaceWith(value);
    }
  }

  toggleClass(element: HTMLElement, className: string, force?: boolean) { 
     element.classList.toggle(className, force);
    }
  
  setText(element: HTMLElement, value: unknown) {      
    if (element) {
    element.textContent = String(value);
    }
  }

  setDisabled(element: HTMLElement, state: boolean) { 
    if (state) {
      element.setAttribute('disabled', 'disabled');
    } else {
      element.removeAttribute('disabled');
    }
  }

  setHidden(element: HTMLElement) { 
    element.style.display = 'none';
  }   
  setVisible(element: HTMLElement) {
    element.style.display = 'block';
  }
  setImage(element: HTMLImageElement, src: string, alt?: string) {
    element.src = src;
    if (alt) {
      element.alt = alt;
    }
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }

  clear(element: HTMLElement) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}