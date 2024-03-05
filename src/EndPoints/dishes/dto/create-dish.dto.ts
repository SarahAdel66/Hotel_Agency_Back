import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDishDto {
    _id:number;
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    description:string;
    @IsString()
    @IsNotEmpty()
    image:string;
    @IsNumber()
    @IsNotEmpty()
    price:number;
}
