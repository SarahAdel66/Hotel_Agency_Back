import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DishesSchema } from './dishes.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"dishes",schema:DishesSchema}]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
