import { BaseView } from "../base/view";
import { ensureElement } from "../../utils/utils";


interface IForm {
  formContainer: HTMLElement;
  submitButton: HTMLButtonElement;
  errorsContainer: HTMLElement;
}

export class FormView extends BaseView<IForm> {
  protected _submitButton: HTMLButtonElement;
  protected _errorsContainer: HTMLElement;

  constructor (container: HTMLElement) {
    super(container);
    this._submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
    this._errorsContainer = ensureElement<HTMLElement>('.form__errors', container);
  }
  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.setText(this._errorsContainer, value);
  }

}