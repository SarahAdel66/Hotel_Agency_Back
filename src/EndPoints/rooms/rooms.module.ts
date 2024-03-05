import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './rooms.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'rooms',schema:RoomSchema}]),],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
