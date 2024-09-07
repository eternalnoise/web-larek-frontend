import './scss/styles.scss';
import { Api, ApiListResponse } from './components/base/api';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { CatalogModel } from './components/model/CatalogModel';
import { BasketModel } from './components/model/BasketModel';
import { CheckoutModel } from './components/model/CheckoutModel';
import { ProductCard } from './components/view/Card';
import { Page } from './components/view/Page';
import { CatalogView } from './components/view/Catalog';
import { BasketIconView, BasketOpenedView } from './components/view/Basket';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IBasket, IProduct } from './types/types';
import { ModalView } from './components/view/Modal';
import { DeliveryDetails, IDeliveryFormData } from './components/view/DeliveryDetails';
import { ContactsDetails, IContactsFormData } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { IBasketView } from './types/types';

const api = new Api(API_URL);
const events = new EventEmitter();

// Селекторы

const catalogElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>("#modal-container");
const basketIconElement = ensureElement<HTMLButtonElement>('.page');

// Темплейты

const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const deliveryFormTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsFormTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

// Model

const catalogModel = new CatalogModel([], events);
const basketModel = new BasketModel([], events);
const checkoutModel = new CheckoutModel({}, events);

// View

const basketIcon = new BasketIconView(basketIconElement, events);
const page = new Page(document.body, events);
const catalog = new CatalogView(catalogElement, events);
const modal = new ModalView(modalElement, events);
const basket = new BasketOpenedView(cloneTemplate(basketTemplate), events);
const deliveryForm = new DeliveryDetails(cloneTemplate(deliveryFormTemplate), events);
const contactsForm = new ContactsDetails(cloneTemplate(contactsFormTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

// Функции рендера M -> V

function getCatalogCards(data: IProduct[]): HTMLElement[] {
  return data.map((item) => {
    const card = new ProductCard(
      cloneTemplate(cardTemplate), 
      () => {events.emit("catalog_selected", item)}
    );
    return card.render(item);
  })
}

function renderBasketCard(item: IProduct, index: number): HTMLElement {
  const card = new ProductCard(
    cloneTemplate(basketItemTemplate), 
    () => {events.emit("basket_remove", item)}
  );
  card.basket_index = index + 1;
  return card.render(item);
}

function renderBasket() {
  const basketItems: HTMLElement[] = basketModel.items.map((item, index) => {return renderBasketCard(item, index)});
  const basketList: IBasketView = {
    basketList: basketItems,
    totalPrice: basketModel.totalPrice
  };
  modal.render({
    content: basket.render(basketList)
  });
}

// Загрузка продуктов

api.get('/product')
  .then((data : ApiListResponse<IProduct>) => {
    catalogModel.setProducts(data.items);
    events.emit('catalog_changed');
  })
  .catch((err) => {
    console.log(err);
  });

// События брокера

events.on("catalog_changed", () => {
  const catalogList: HTMLElement[] = getCatalogCards(catalogModel.items);
  page.catalog = catalog.render(catalogList);
  page.render();
})

events.on("modal_open", () => {
  page.lock();
})

events.on("modal_close", () => {
  page.unlock();
})

events.on("catalog_selected", (item: IProduct) => {
  const card = new ProductCard(cloneTemplate(cardPreviewTemplate), () => {
    events.emit("basket_add", item);
  });
  if (item.inBasket) {
    card.toggleButtonState(true);
  }
  const cardElement = card.render(item);
  modal.render({
    content: cardElement
  });
})

events.on("basket_add", (item) => {
  basketModel.addProduct(item as IProduct);
  modal.close();
})

events.on("basket_remove", (item) => {
  basketModel.removeProduct(item as IProduct);
  renderBasket();
})

events.on("basket_changed", () => {
  basketIcon.counter = basketModel.itemsNumber;
})

events.on("basket_open", () => {
  modal.open();
  renderBasket();
})

events.on("basket_close", () => {
  modal.close();
})

events.on("checkout_proceed", () => {
  checkoutModel.items = basketModel.items;
  checkoutModel.totalPrice = basketModel.totalPrice;
  modal.render({
    content: deliveryForm.render()
  });
})

events.on("deliveryForm_changed", (formData: IDeliveryFormData) => {
  checkoutModel.payment = formData.payment;
  checkoutModel.address = formData.address;
  const validationData = checkoutModel.validateDeliveryForm();
  deliveryForm.valid = validationData.valid;
  deliveryForm.errors = validationData.errors;
})

events.on("deliveryForm_submit", () => {
  modal.render({
    content: contactsForm.render()
  });
})

events.on("contactsForm_changed", (formData: IContactsFormData) => {
  checkoutModel.phone = formData.phone;
  checkoutModel.email = formData.email;
  const validationData = checkoutModel.validateContactsForm();
  contactsForm.valid = validationData.valid;
  contactsForm.errors = validationData.errors;
})

events.on("contactsForm_submit", () => {
  const req = checkoutModel.order;
  api.post('/order', req)
    .then(() => {
      modal.render({
        content: success.render({
          successPrice: checkoutModel.totalPrice
        })
      });
      checkoutModel.clear();
      basketModel.clear();
    })
    .catch((err) => {
      console.log(err);
    })
})

events.on("success_close", () => {
  modal.close();
})
