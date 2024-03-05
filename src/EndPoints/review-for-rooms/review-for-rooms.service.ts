import { Injectable } from '@nestjs/common';
import { CreateReviewForRoomDto } from './dto/create-review-for-room.dto';
import { UpdateReviewForRoomDto } from './dto/update-review-for-room.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewForRoomsService {
  constructor(@InjectModel('review-for-rooms')  private ReviewForRoomsModel){}
  async AddReview(createReviewForRoomDto: CreateReviewForRoomDto) {
    var maxIdReview = await this.ReviewForRoomsModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    var maxId = maxIdReview ? maxIdReview._id : 0;
    createReviewForRoomDto._id = maxId+1;
    let newReview = new this.ReviewForRoomsModel(createReviewForRoomDto)
    await newReview.save()
    return {message:"Review Added Successfuly", data:newReview};
  }

  findAll() {
    return this.ReviewForRoomsModel.find({});
  }

  async findByRoomId(id: number) {
    let reviews = await this.ReviewForRoomsModel.find({roomId: id}) 
    if(reviews.length !== 0)return reviews;
    return{message:"there is No Review"}
  }

  update(id: number, updateReviewForRoomDto: UpdateReviewForRoomDto) {
    return `This action updates a #${id} reviewForRoom`;
  }

  async remove(id: number) {
    await this.ReviewForRoomsModel.findByIdAndDelete(id)
    let newData = await this.ReviewForRoomsModel.find({});
    return {message:"Deleted Successfully", data:newData};
  }
}
