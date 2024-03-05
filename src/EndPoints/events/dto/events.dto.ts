import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, MinLength, isBoolean } from "class-validator";

export class EventWithDto {

    // @IsNumber()
    _id: number;

    // @IsNotEmpty()
    // @IsString()
    name: string;


    // @IsNotEmpty()
    date: string;


    // @IsNotEmpty()
    image: string;

    // @IsNotEmpty()
    category: string;


}
