class ModalView {
  open();
  close();
  set content(value: HTMLElement) {
    this._content = value;
  }
}