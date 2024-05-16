import { Product } from "../domain/products.types";

export type ProductDto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
};

export function toProduct(data: ProductDto): Product {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    image: data.images[0],
  };
}
