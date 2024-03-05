import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min, MinLength, isBoolean } from "class-validator";

export class UserWithDto{

    // @IsNumber()
    _id:number;

    // @IsNotEmpty()
    // @IsString()
    name:string;



    // @IsEmail()
    // @IsNotEmpty()
    email:string;

   
    // @IsNotEmpty()
    // @Min(10)
    // @Max(40)
    password:string;

    // @IsNotEmpty()
    // @Min(10)
    // @Max(60)
    image:string;

    // @IsNotEmpty()
    isAdmin:boolean;
}
