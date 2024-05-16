import { Product } from "../domain/products.types";

export type ProductListItem = Pick<Product, "id" | "image" | "title" | "price">;
export function toProductListItem(product: Product): ProductListItem {
  return {
    id: product.id,
    image: product.image,
    title: product.title,
    price: product.price,
  };
}
