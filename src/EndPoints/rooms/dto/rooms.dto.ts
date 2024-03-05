import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, MinLength, isBoolean } from "class-validator";

export class RoomWithDto {

    // @IsNumber()
    _id: number;

    // @IsNotEmpty()
    // @IsString()
    type: string;



    // @IsNotEmpty()
    standardOccupancy: number;


    // @IsNotEmpty()
    // @Min(10)
    // @Max(40)
    maximumOccupancy: number;

    // @IsNotEmpty()
    // @Min(10)
    // @Max(60)
    image: string;

    // @IsNotEmpty()
    basePrice: number;

    // @IsNotEmpty()
    extraPerson: number;

    // @IsNotEmpty()
    services: [];

    // @IsNotEmpty()
    description: string;

    // @IsNotEmpty()
    rating: number;
}
