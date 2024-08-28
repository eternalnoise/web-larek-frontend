export type { IProduct, IBasket, IContacts, IDeliveryDetails, ICheckoutDetails, PaymentOption, IEvents };
interface IProduct {
  id: string;
  description: string;
  price: number | null;
  image: string;
  title: string;
  category: string;
}

interface IBasket {
  products: IProduct[];
  itemsNumber: number;  
  totalPrice: number;
}

interface IContacts {
  email: string;
  phoneNumber: string;
}

interface IDeliveryDetails {
  payment: PaymentOption;
  address: string;
}

interface ICheckoutDetails extends IBasket, IContacts, IDeliveryDetails {}

type PaymentOption = 'Онлайн' | 'При получении';

interface IEvents {
  on<T extends object>(event: string, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
  