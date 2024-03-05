import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { userSchema } from './auth.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"users",schema:userSchema}]),
    JwtModule.register({secret:"hotelSecret",signOptions:{expiresIn:"10d"}})
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
