import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class ReservationService {
  constructor(@InjectModel('reservations') private ReservationModel,private  roomService:RoomsService) {}

  private async reserve(createReservationDto:CreateReservationDto,roomToReserve:any){
    var maxIdReservation = await this.ReservationModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    var maxId = maxIdReservation ? maxIdReservation._id : 0;
    createReservationDto._id = maxId+1;
    let newReservation = new this.ReservationModel(createReservationDto);
    await newReservation.save();
    roomToReserve.quantity -= createReservationDto.roomsNo;
    await this.roomService.update(createReservationDto.roomId, roomToReserve);
    return newReservation;
  }

  async create(createReservationDto: CreateReservationDto) {
    let roomToReserve = await this.roomService.findOne(createReservationDto.roomId);
    let willBeAvailable=roomToReserve.quantity;
    if(roomToReserve.quantity < createReservationDto.roomsNo){
      let validRooms= await this.ReservationModel.find({checkOutDate :{$lte : createReservationDto.checkInDate},roomId:createReservationDto.roomId})
      if(validRooms.length === 0)return {message:"Room Not Available At this time"}
      validRooms.forEach((element:CreateReservationDto) => {willBeAvailable+= element.roomsNo})
    }
    if(willBeAvailable < createReservationDto.roomsNo)return {message:"Room Not Available At this time"}
    let newReservation = await this.reserve(createReservationDto,roomToReserve)
    return {message:"Reservation Success", data:newReservation};
  }

  findAll() {
    return this.ReservationModel.find({})
  }

  async findOne(id: number) {
    let founded = await this.ReservationModel.findById(id);
    if(!founded) return  {message:"Reservation Not Found"};
    return founded;
  }

  async findByUID(UID:number){
    let  reservations=await this.ReservationModel.find({userId:UID});
    if(reservations.length === 0) return {message:'User has no reservation'}
    return reservations;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    let updatedReservation = await this.ReservationModel.findByIdAndUpdate(id,updateReservationDto,{new:true,runValidators:true})
    if(!updatedReservation)return {message:"Update Failed! Please try again later."}
    return {message:"Updated Successfully", data:updatedReservation};
  }

  async remove(id: number) {
    const removedReservation = await this.ReservationModel.findById(id);
    await this.ReservationModel.findByIdAndDelete(id)
    let{ roomsNo, roomId } = removedReservation
    let updatedRoom = await this.roomService.findOne(roomId)
    updatedRoom.quantity += roomsNo
    await this.roomService.update(roomId,updatedRoom)
    let newData = await this.ReservationModel.find({});
    return {message:"Deleted Successfully", data:newData};
  }
}
