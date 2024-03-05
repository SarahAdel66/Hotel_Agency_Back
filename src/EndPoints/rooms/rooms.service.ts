import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RoomWithDto } from './dto/rooms.dto';

@Injectable()
export class RoomsService {

  constructor(@InjectModel('rooms') private RoomModel) { }

  async create(room: RoomWithDto) {

    let newRoom = new this.RoomModel(room)

    //increment id
    const maxIdRooms = await this.RoomModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } })
    const maxId = maxIdRooms ? maxIdRooms._id : 0;
    newRoom._id = maxId + 1

    await newRoom.save();
    return { message: "Added Successfully", data: newRoom };
  }

  findAll() {
    return this.RoomModel.find({})
  }

   findRoomsByPriceRange(minPrice: number, maxPrice: number) {

    const priceFilter = { basePrice: { $gte: minPrice, $lte: maxPrice }};
    return this.RoomModel.find(priceFilter).exec();
  }
  
  findOne(id: number) {
    return this.RoomModel.findOne({ _id: id })
  }

 async update(id: number, room: RoomWithDto) {

  await this.RoomModel.updateOne({ _id: id }, room)
  return { message: "Updated Successfully" };
  }

  remove(id: number) {
    
 this.RoomModel.deleteOne({ _id: id }).exec()
    return { message: "Deleted Successfully" };  }
}
