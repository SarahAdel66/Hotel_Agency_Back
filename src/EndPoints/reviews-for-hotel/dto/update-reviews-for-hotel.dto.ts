import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewsForHotelDto } from './create-reviews-for-hotel.dto';

export class UpdateReviewsForHotelDto extends PartialType(CreateReviewsForHotelDto) {}
