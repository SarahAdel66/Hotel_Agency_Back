import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewForRoomDto } from './create-review-for-room.dto';

export class UpdateReviewForRoomDto extends PartialType(CreateReviewForRoomDto) {}
