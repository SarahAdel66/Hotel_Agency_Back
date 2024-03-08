import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './reservation.schema';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"reservations",schema:ReservationSchema}]),
    RoomsModule
],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
