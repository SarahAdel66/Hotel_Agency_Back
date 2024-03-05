import { Module } from '@nestjs/common';
import { ReviewsForHotelService } from './reviews-for-hotel.service';
import { ReviewsForHotelController } from './reviews-for-hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviwesForHotelSchema } from './reviews-for-hotel.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'reviewsForHotel',schema:ReviwesForHotelSchema}]),],
  controllers: [ReviewsForHotelController],
  providers: [ReviewsForHotelService],
})
export class ReviewsForHotelModule {}
