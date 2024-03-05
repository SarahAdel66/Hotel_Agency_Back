import { Test, TestingModule } from '@nestjs/testing';
import { ReviewForRoomsController } from './review-for-rooms.controller';
import { ReviewForRoomsService } from './review-for-rooms.service';

describe('ReviewForRoomsController', () => {
  let controller: ReviewForRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewForRoomsController],
      providers: [ReviewForRoomsService],
    }).compile();

    controller = module.get<ReviewForRoomsController>(ReviewForRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
