import {Injectable, NotFoundException, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PrismaService} from 'src/prisma/prisma.service';
import {Product} from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prismaService.product.create({data: createProductDto});
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el producto: ${error.message}`);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.prismaService.product.findMany({
        where: {enabled: true},
        orderBy: {id: 'asc'},
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los productos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {id, enabled: true},
      });
      if (!product) {
        throw new NotFoundException(`No se encontró producto con id ${id}`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el producto: ${error.message}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.prismaService.product.update({where: {id}, data: updateProductDto});
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.prismaService.product.update({
        where: {id},
        data: {enabled: false},
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el producto: ${error.message}`);
    }
  }
}
