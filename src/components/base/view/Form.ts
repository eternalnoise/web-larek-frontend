class FormView {
  _submitButton: HTMLButtonElement;
  _errors: HTMLElement;
  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
  }

}