class ProductCardCatalog {
  id: string;
  image: string;
  title: string;
  price: number | null;
  category: string;

  constructor(id: string, image: string, title: string, price: number | null, category: string) {
    this.id = id;
    this.image = image; 
    this.title = title; 
    this.price = price;
    this.category = category;
  }
  render() {
    super.render();
  }
}

class ProductCardModal {
  id: string;
  description: string;
  image: string;
  title: string;
  price: number | null;
  category: string;
  addToBasketButton: HTMLElement;
}

class ProductBasketItem {
  id: string;
  title: string;
  price: number | null;
  deleteButton: HTMLElement;
}