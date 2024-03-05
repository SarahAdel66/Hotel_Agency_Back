import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegAuthDto } from './dto/reg-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users')  private UserModel,private jwtService:JwtService) {}
  private async findUser(email:string){
    let foundedUser = await this.UserModel.findOne({email});
    return foundedUser;
  }

  async Reg(regAuthDto: RegAuthDto) {
    let foundUser = await this.findUser(regAuthDto.email);
    if(foundUser) return {message: "Email is already used, please login"};
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(regAuthDto.password, salt);
    regAuthDto.password = hashedPass
    var maxIdUser = await this.UserModel.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    var maxId = maxIdUser ? maxIdUser._id : 0;
    regAuthDto._id = maxId+1;
    let newUser = new this.UserModel(regAuthDto)
    await newUser.save()
    return {message:"Regestration Success", data:newUser};
  }

  async Login(loginAuthDto: LoginAuthDto,res:Response) {
    let foundUser = await this.findUser(loginAuthDto.email);
    if(!foundUser) return {message:"Invalid Email or Password"};
    const validPassword = await bcrypt.compare(loginAuthDto.password, foundUser.password);
    if (!validPassword) return {message:'Invalid Email or Password'};
    let token=this.jwtService.sign({name:foundUser.name,isAdmin:foundUser.isAdmin},{secret:"hotelSecret"})
    res.cookie("Authorization",token)
   return {message:"Logged In Successfully"}

  }

  findAll() {
    return this.UserModel.find({});
  }

  async findOne(id: number) {
    var founded = await  this.UserModel.findById(id)
    if(founded)return founded;
    return{message:"Customer Not Found"}
  }

  async update(id: number, updatedUserDto: RegAuthDto) {
    // let founded = await this.UserModel.findById(id);
    // if(!founded)return {message:"Customer not found!"}
    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(updatedUserDto.password,salt)
    updatedUserDto.password = hashedPass
    let updatedUser = await this.UserModel.findByIdAndUpdate(id,updatedUserDto,{new:true,runValidators:true})
    if(!updatedUser)return {message:"Updation Failed! Please try again later."}
    return {message:"Updated Successfully", data:updatedUser};

  }

  async remove(id: number) {
    await this.UserModel.findByIdAndDelete(id)
    let newData = await this.UserModel.find({});
    return {message:"Deleted Successfully", data:newData};
  }
}
