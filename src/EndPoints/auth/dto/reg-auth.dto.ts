import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegAuthDto {
    _id:number;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string
    @IsString()
    image:string
    @IsBoolean()
    @IsOptional()
    isAdmin:boolean;
}