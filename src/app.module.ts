import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './EndPoints/rooms/rooms.module';
import { EventsModule } from './EndPoints/events/events.module';
import { DishesModule } from './EndPoints/dishes/dishes.module';
import { BranchesModule } from './EndPoints/branches/branches.module';
import { AuthModule } from './EndPoints/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './EndPoints/auth/roles.guard';
import { ReviewForRoomsModule } from './EndPoints/review-for-rooms/review-for-rooms.module';
import { ReviewsForHotelModule } from './EndPoints/reviews-for-hotel/reviews-for-hotel.module';

@Module({
  imports: [
    RoomsModule,
    EventsModule,
    DishesModule,
    BranchesModule,
    AuthModule,
    ReviewForRoomsModule,
    ReviewsForHotelModule,
    MongooseModule.forRoot('mongodb+srv://sarahadel263:8yuG7fLrqzbGFxcz@cluster0.ekxfmem.mongodb.net/hotelWebsite'),
    JwtModule.register({secret:"hotelSecret",signOptions:{expiresIn:"10d"}})    
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    }
  ],
})
export class AppModule {}
