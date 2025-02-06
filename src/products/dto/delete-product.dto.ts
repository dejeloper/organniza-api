import {CreateProductDto} from "./create-product.dto";

// export class DeleteProductDto extends PartialType(CreateProductDto) { };
export type DeleteProductDto = Partial<CreateProductDto>;