import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, MinLength, isBoolean } from "class-validator";

export class ReviewForHotelWithDto {

    // @IsNumber()
    _id: number;

    // @IsNotEmpty()
    // @IsString()
    rating: number;


    // @IsNotEmpty()
    author: string;


    // @IsNotEmpty()
    date: string;

    // @IsNotEmpty()
    text: string;


}
