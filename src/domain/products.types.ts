import { ProductDto } from "../dto/products.dto";

export type Product = Pick<
  ProductDto,
  "id" | "title" | "price" | "description"
> & { image: string };
