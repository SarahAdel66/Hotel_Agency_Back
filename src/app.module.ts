import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './EndPoints/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './EndPoints/rooms/rooms.module';
import { EventsModule } from './EndPoints/events/events.module';
import { DishesModule } from './EndPoints/dishes/dishes.module';
import { BranchesModule } from './EndPoints/branches/branches.module';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    EventsModule,
    DishesModule,
    BranchesModule,
    MongooseModule.forRoot('mongodb+srv://sarahadel263:8yuG7fLrqzbGFxcz@cluster0.ekxfmem.mongodb.net/hotelWebsite')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
