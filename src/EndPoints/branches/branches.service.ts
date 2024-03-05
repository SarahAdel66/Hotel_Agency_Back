import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BranchesService {
  constructor(@InjectModel('branches') private  BranchesModel) {}
  create(createBranchDto: CreateBranchDto) {
    return 'This action adds a new branch';
  }

  findAll() {
    return this.BranchesModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
