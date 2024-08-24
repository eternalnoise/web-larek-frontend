class BasketModel {
  items: Product[];
  itemsNumber: number;
  totalPrice: number;
  addProduct(product: Product) {
    this.items.push(product);
}
  removeProduct(product: Product) {
}
  getTotalPrice(): number {
}

  clear() {

}
}
