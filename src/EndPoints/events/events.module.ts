import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventSchema } from './events.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'events',schema:EventSchema}]),],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
