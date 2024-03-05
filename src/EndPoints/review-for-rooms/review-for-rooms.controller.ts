import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewForRoomsService } from './review-for-rooms.service';
import { CreateReviewForRoomDto } from './dto/create-review-for-room.dto';
import { UpdateReviewForRoomDto } from './dto/update-review-for-room.dto';

@Controller('review-for-rooms')
export class ReviewForRoomsController {
  constructor(private readonly reviewForRoomsService: ReviewForRoomsService) {}

  @Post()
  AddReview(@Body() createReviewForRoomDto: CreateReviewForRoomDto) {
    return this.reviewForRoomsService.AddReview(createReviewForRoomDto);
  }

  @Get()
  findAll() {
    return this.reviewForRoomsService.findAll();
  }

  @Get(':id')
  findByRoomId(@Param('id') id: string) {
    return this.reviewForRoomsService.findByRoomId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewForRoomDto: UpdateReviewForRoomDto) {
    return this.reviewForRoomsService.update(+id, updateReviewForRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewForRoomsService.remove(+id);
  }
}
