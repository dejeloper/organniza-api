import {
  Injectable,
} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {PrismaService} from 'src/prisma/prisma.service';
import {Prisma, Product} from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto): Promise<{message: string} | Product> {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' || error.code === 'P2003') {
          const errorMessage = "Ya existe un producto con el mismo nombre";
          return {message: `No se pudo crear el producto. ${errorMessage}`};
        }
      }

      return {message: `Error al crear el producto: ${error.message}`};
    }
  }

  async findAll(): Promise<{message: string} | Product[]> {
    try {
      return await this.prismaService.product.findMany({orderBy: {id: 'asc'}});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2016' || error.code === 'P2025') {
          const errorMessage = error['product'].cause;
          return {message: `No se pudo obtener los productos. ${errorMessage}`};
        }
      }

      return {message: `Error al obtener los productos: ${error.message}`};
    }
  }

  async findOne(id: number): Promise<{message: string} | Product> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: {id},
      });

      if (!product) {
        return {message: `No se encontró producto con id ${id}`};
      }

      return product;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2016' || error.code === 'P2025') {
          const errorMessage = error['product'].cause;
          return {message: `No se pudo obtener el producto. ${errorMessage}`};
        }
      }
      return {message: `Error al obtener el producto: ${error.message}`};
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productUpdated = await this.prismaService.product.findUnique({
        where: {id},
      });

      if (!productUpdated) {
        return {message: `No se encontró producto con id ${id}`};
      }

      return await this.prismaService.product.update({
        where: {id},
        data: updateProductDto
      });

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' || error.code === 'P2003' || error.code === 'P2025') {
          const errorMessage = error.meta?.cause || ""
          return {message: `No se pudo actualizar el producto. ${errorMessage}`};
        }
      }

      return {message: `Error al actualizar el producto: ${error.message}`};
    }
  }

  async remove(id: number) {
    try {
      const productDeleted = await this.prismaService.product.findUnique({
        where: {id, enabled: true},
      });

      if (!productDeleted) {
        return {message: `No se encontró producto con id ${id}`};
      }

      const deleted = await this.prismaService.product.update({
        where: {id},
        data: {
          deletedAt: new Date(),
          enabled: false
        },
      });
      console.log(deleted)
      return deleted;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' || error.code === 'P2003' || error.code === 'P2025' || error.code === 'P2014') {
          const errorMessage = error.meta?.cause || ""
          return {message: `No se pudo eliminar el producto. ${errorMessage}`};
        }
      }

      return {message: `Error al eliminar el producto: ${error.message}`};
    }
  }
}
