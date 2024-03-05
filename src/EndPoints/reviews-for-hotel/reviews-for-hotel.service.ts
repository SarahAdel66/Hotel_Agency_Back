import { Injectable } from '@nestjs/common';
import { CreateReviewsForHotelDto } from './dto/create-reviews-for-hotel.dto';
import { UpdateReviewsForHotelDto } from './dto/update-reviews-for-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewsForHotelService {

  constructor(@InjectModel('reviewsForHotel') private reviewsForHotelModel) { }

  findAll() {
    return this.reviewsForHotelModel.find({})
  }

  findOne(id: number) {
    return this.reviewsForHotelModel.findOne({ _id: id})  }

}
