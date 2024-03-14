import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class ReservationService {
  constructor(@InjectModel('reservations') private ReservationModel,private  roomService:RoomsService) {}

  private async reserve(createReservationDto:CreateReservationDto){
    // private async reserve(createReservationDto:CreateReservationDto,roomToReserve:any){
    var maxIdReservation = await this.ReservationModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    var maxId = maxIdReservation ? maxIdReservation._id : 0;
    createReservationDto._id = maxId+1;
    let newReservation = new this.ReservationModel(createReservationDto);
    await newReservation.save();
    // roomToReserve.quantity -= createReservationDto.roomsNo;
    // console.log(roomToReserve);
    // await this.roomService.update(createReservationDto.roomId, roomToReserve);
    return newReservation;
  }
  private async checkAvailability(createReservationDto:any){
    let roomToReserve = await this.roomService.findOne(createReservationDto.roomId);
    let reservationForThisRoom=[];

    if(createReservationDto._id){
      reservationForThisRoom = await this.ReservationModel.find({roomId:createReservationDto.roomId,_id:{$ne : createReservationDto._id}});
      console.log("cool ia m here");
    }else{
      reservationForThisRoom = await this.ReservationModel.find({roomId:createReservationDto.roomId},);
      console.log("i am here (;");
    }
    if(roomToReserve.quantity  < createReservationDto.roomsNo)return {message:`we only have ${roomToReserve.quantity}  rooms from  this type`}
    if(reservationForThisRoom.length !== 0){
      let validRooms= await this.ReservationModel.find({checkOutDate :{$lte : createReservationDto.checkInDate,$ne : createReservationDto.checkInDate},roomId:createReservationDto.roomId})
      let currentlyReserved = 0;   
      // console.log(reservationForThisRoom);
      reservationForThisRoom.forEach((element:CreateReservationDto)=>{currentlyReserved+=element.roomsNo})
      let willBeAvailable = 0;
      if(validRooms.length === 0){
        let notAffectingReserv = await this.ReservationModel.find({checkInDate :{$gte : createReservationDto.checkOutDate,$ne : createReservationDto.checkOutDate},roomId:createReservationDto.roomId})
        let notAffectingRoomsNo = 0;   
        notAffectingReserv.forEach((element:CreateReservationDto)=>{notAffectingRoomsNo+=element.roomsNo})
        currentlyReserved -=  notAffectingRoomsNo
        willBeAvailable = roomToReserve.quantity - currentlyReserved
        if(willBeAvailable < 1){return {message:`we dont have rooms from  this type At this time`}}
        if(willBeAvailable < createReservationDto.roomsNo) return {message:`we only have ${roomToReserve.quantity}  rooms from  this type At this time`}
      }else{
        let available =  roomToReserve.quantity - currentlyReserved
        validRooms.forEach((element:CreateReservationDto) => {willBeAvailable+= element.roomsNo})
        available += willBeAvailable 
        if(available < 1)return {message:`we dont have rooms from  this type At this time`}
        if(available < createReservationDto.roomsNo)return {message:`we only have ${available}  rooms from  this type At this time`}
      }
    }
    return {message:undefined}
  }
  async create(createReservationDto: CreateReservationDto) {
    // let validRooms= await this.ReservationModel.find({checkOutDate :{$lte : createReservationDto.checkInDate},roomId:createReservationDto.roomId})
    // if(validRooms.length === 0)return {message:"Room Not Available At this time"}
    // let willBeAvailable = 0;
    // let willBeAvailable = roomToReserve.quantity;
    // if(roomToReserve.quantity < createReservationDto.roomsNo){
      // let validRooms= await this.ReservationModel.find({checkOutDate :{$lte : createReservationDto.checkInDate},roomId:createReservationDto.roomId})
      // if(validRooms.length === 0)return {message:"Room Not Available At this time"}
      // validRooms.forEach((element:CreateReservationDto) => {willBeAvailable+= element.roomsNo})
    // }
    // if(willBeAvailable < createReservationDto.roomsNo)return {message:"Room Not Available At this time"}
    let Available = (await this.checkAvailability(createReservationDto)).message
    if(Available) return {message:Available}
    let newReservation = await this.reserve(createReservationDto)
    // let newReservation = await this.reserve(createReservationDto,roomToReserve)
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
    let Available = (await this.checkAvailability(updateReservationDto)).message
    if(Available) return {message:Available}
    let updatedReservation = await this.ReservationModel.findByIdAndUpdate(id,updateReservationDto,{new:true,runValidators:true})
    if(!updatedReservation)return {message:"Update Failed! Please try again later."}
    return {message:"Updated Successfully", data:updatedReservation};
  }

  async remove(id: number) {
    // const removedReservation = await this.ReservationModel.findById(id);
    await this.ReservationModel.findByIdAndDelete(id)
    // let{ roomsNo, roomId } = removedReservation
    // let updatedRoom = await this.roomService.findOne(roomId)
    // updatedRoom.quantity += roomsNo
    // await this.roomService.update(roomId,updatedRoom)
    let newData = await this.ReservationModel.find({});
    return {message:"Deleted Successfully", data:newData};
  }
}
