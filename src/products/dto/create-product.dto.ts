// import {Transform} from 'class-transformer';
// import {IsString, IsNumber} from 'class-validator';

import {Product} from "@prisma/client";

// export class CreateProductDto {
// 	@IsString()
// 	readonly name: string;
// 	@IsNumber()
// 	readonly price: number;
// 	@IsString()
// 	readonly category: string;
// 	@IsString()
// 	readonly clasification: string; 
// }

export type CreateProductDto = Omit<Product, 'id' | 'enabled' | 'createdAt' | 'updatedAt' | 'deletedAt'>;