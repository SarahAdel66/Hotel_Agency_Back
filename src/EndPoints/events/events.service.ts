import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventWithDto } from './dto/events.dto';

@Injectable()
export class EventsService {

  constructor(@InjectModel('events') private EventModel) { }

  

  findAll() {
    return this.EventModel.find({}) 
  }

  findOne(id: number) {
    return this.EventModel.findOne({ _id: id})  }

 
}
