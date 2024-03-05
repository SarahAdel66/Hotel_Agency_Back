import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserWithDto } from './dto/users.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('users') private UserModel) { }

  async create(user: UserWithDto) {

    let newUser = new this.UserModel(user)

    //increment id
    const maxIdUsers = await this.UserModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } })
    const maxId = maxIdUsers ? maxIdUsers._id : 0;
    newUser._id = maxId + 1

    await newUser.save();
    return { message: "Added Successfully", data: newUser };
  }

  findAll() {
    return this.UserModel.find({});
  }

  findOne(id: number) {
    return this.UserModel.findOne({ _id: id })

  }

  async update(id: number, user: UserWithDto) { //using PATCH

    await this.UserModel.updateOne({ _id: id }, user)
    return { message: "Updated Successfully" };
  }

  remove(id: number) {

    this.UserModel.deleteOne({ _id: id }).exec()
    return { message: "Deleted Successfully" };
  }
}
