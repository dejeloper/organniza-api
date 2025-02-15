import {Module} from '@nestjs/common';
import {ProductsModule} from './products/products.module';
import {PrismaService} from './prisma/prisma.service';
import {PlacesModule} from './config/places/places.module';
import {ProductsController} from './products/products.controller';
import {PlacesController} from './config/places/places.controller';

@Module({
  imports: [ProductsModule, PlacesModule],
  controllers: [ProductsController, PlacesController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule { }
