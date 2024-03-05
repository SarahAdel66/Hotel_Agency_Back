import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DishesService {
  constructor(@InjectModel('dishes') private  DishesModel) {}
  create(createDishDto: CreateDishDto) {
    return 'This action adds a new dish';
  }

  findAll() {
    return this.DishesModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
}
