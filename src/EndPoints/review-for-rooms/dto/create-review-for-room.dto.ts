import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class CreateReviewForRoomDto {
    _id:number;
    @IsNumber()
    @IsNotEmpty()
    roomId:number;
    @IsNumber()
    @IsNotEmpty()
    rating:number;
    @IsString()
    @IsNotEmpty()
    author:string;
    @IsString()
    @IsNotEmpty()
    date:string;
    @IsString()
    @IsNotEmpty()
    text:string;
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}
