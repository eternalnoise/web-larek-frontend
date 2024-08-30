export type { IProduct, IBasket, IContacts, IDeliveryDetails, ICheckoutDetails, PaymentOption, IEvents, IPage, IModal, IFormValidation};
interface IProduct {
  id: string;
  description: string;
  price: number | null;
  image: string;
  title: string;
  category: string;
  inBasket: boolean;
}

interface IContacts {
  email: string;
  phone: string;
}

interface IDeliveryDetails {
  payment: PaymentOption;
  address: string;
}

interface ICheckoutDetails extends IContacts, IDeliveryDetails {
  total: number;
  items: string[];
}

type PaymentOption = 'Онлайн' | 'При получении' | undefined;

interface IEvents {
  on<T extends object>(event: string, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

interface IPage {
  pageContainer: HTMLElement;
  events: IEvents; 
  basketIconContainer: HTMLElement;
  catalog: HTMLElement;
  wrapper: HTMLElement;
}


interface IBasket {
  items: IProduct[];
  itemsNumber: number;  
  totalPrice: number;
}

interface IModal {
  content: HTMLElement;
}


interface IFormValidation {
  valid: boolean;
  errors: string;
}