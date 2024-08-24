class CheckoutModel {
  payment: PaymentOption;
  address: string;
  email: string;
  phoneNumber: string;
  price: number;
  items: string[];
  validateDeliveryForm(): boolean;
  validateContactForm(): boolean;
  getPlaceOrderRequest(): object;
  clear(): void;
}