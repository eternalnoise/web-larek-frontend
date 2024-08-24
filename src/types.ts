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

interface ICheckoutDetails extends IContacts, IDeliveryDetails {
  price: number;
  items: string[];
  enum PaymentOption = { Online = 'Онлайн', InPerson = 'При получении' }
}

