import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsForHotelService } from './reviews-for-hotel.service';
import { CreateReviewsForHotelDto } from './dto/create-reviews-for-hotel.dto';
import { UpdateReviewsForHotelDto } from './dto/update-reviews-for-hotel.dto';

@Controller('reviews-for-hotel')
export class ReviewsForHotelController {
  
  constructor(private readonly reviewsForHotelService: ReviewsForHotelService) {}

  

  @Get()
  findAll() {
    return this.reviewsForHotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsForHotelService.findOne(+id);
  }


}
