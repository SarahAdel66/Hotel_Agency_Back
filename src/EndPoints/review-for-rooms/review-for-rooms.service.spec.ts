import { Test, TestingModule } from '@nestjs/testing';
import { ReviewForRoomsService } from './review-for-rooms.service';

describe('ReviewForRoomsService', () => {
  let service: ReviewForRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewForRoomsService],
    }).compile();

    service = module.get<ReviewForRoomsService>(ReviewForRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
