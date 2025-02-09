import {Product} from "@prisma/client";

export type CreateProductDto = Omit<Product, 'id' | 'enabled' | 'createdAt' | 'updatedAt'>;