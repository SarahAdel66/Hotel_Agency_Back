import { Module } from '@nestjs/common';
import { ReviewForRoomsService } from './review-for-rooms.service';
import { ReviewForRoomsController } from './review-for-rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewForRoomsSchema } from './reviewForRooms.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"review-for-rooms",schema:ReviewForRoomsSchema}]),
  ],
  controllers: [ReviewForRoomsController],
  providers: [ReviewForRoomsService],
})
export class ReviewForRoomsModule {}
