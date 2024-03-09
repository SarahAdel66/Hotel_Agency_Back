import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReservationDto {
    _id:number;
    @IsNumber()
    @IsNotEmpty()
    userId:number;
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkInDate: Date;
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkOutDate:Date;
    @IsNumber()
    @IsNotEmpty()
    roomId:number;
    @IsNumber()
    @IsNotEmpty()
    roomsNo:number;
    @IsNumber()
    @IsNotEmpty()
    roomPrice:number
    @IsNumber()
    @IsNotEmpty()
    totalPrice:number
    @IsString()
    @IsNotEmpty()
    branchName:string
}
