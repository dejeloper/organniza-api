import {Response} from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({summary: 'Crear producto'})
  @ApiResponse({status: 201, description: 'Producto creado correctamente'})
  // @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      const product = await this.productsService.create(createProductDto);

      if (typeof product === 'object' && 'message' in product) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: product.message || 'Error al crear el producto',
          response: null,
        });
      }

      return res.status(HttpStatus.CREATED).json({
        status: true,
        message: 'Producto creado correctamente',
        response: product,
      });

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al crear el producto: ${error}`,
        response: null,
      });
    }
  }

  @Get()
  @ApiOperation({summary: 'Listar productos'})
  @ApiResponse({status: 200, description: 'Productos obtenidos correctamente'})
  async findAll(@Res() res: Response) {
    try {
      const productos = await this.productsService.findAll();

      if (Array.isArray(productos) && productos.length === 0) {
        return {
          status: false,
          message: 'No se encontraron productos',
          response: null,
        };
      } else if (typeof productos === 'object' && 'message' in productos) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: productos.message || 'Error al obtener los productos',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Productos obtenidos correctamente',
        response: productos,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al obtener los productos: ${error}`,
        response: null,
      });
    }
  }

  @Get(':id')
  @ApiOperation({summary: 'Obtener producto'})
  @ApiResponse({status: 200, description: 'Producto obtenido correctamente'})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const producto = await this.productsService.findOne(+id);

      if (!producto) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      } else if (typeof producto === 'object' && 'message' in producto) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: producto.message || 'Error al obtener el producto',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Producto obtenido correctamente',
        response: producto,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al obtener el producto: ${error}`,
        response: null,
      });
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Actualizar producto'})
  @ApiResponse({status: 200, description: 'Producto actualizado correctamente'})
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response
  ) {
    try {
      const product = await this.productsService.update(+id, updateProductDto);

      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      } else if (typeof product === 'object' && 'message' in product) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: product.message || 'Error al actualizar el producto',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Producto actualizado correctamente',
        response: product,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al actualizar el producto: ${error}`,
        response: null,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Eliminar producto'})
  @ApiResponse({status: 200, description: 'Producto eliminado correctamente'})
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.remove(+id);

      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'No se encontró el producto',
          response: null,
        });
      } else if (typeof product === 'object' && 'message' in product) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: product.message || 'Error al eliminar el producto',
          response: null,
        });
      }

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Producto eliminado correctamente',
        response: product,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: `Error al eliminar el producto: ${error}`,
        response: null,
      });
    }


  }
}
