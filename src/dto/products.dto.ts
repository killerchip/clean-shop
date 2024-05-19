import { Product } from "../domain/products.types";

export type ProductDto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export function toProduct(data: ProductDto): Product {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    image: data.image,
  };
}
