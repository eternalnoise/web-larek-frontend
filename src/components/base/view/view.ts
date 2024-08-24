abstract class BaseView<T> {
  constructor(container: HTMLElement) {
    this.container = container;
  }
  setElement(query: string, value: HTMLElement) {   
    const element = this.container.querySelector(query);
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