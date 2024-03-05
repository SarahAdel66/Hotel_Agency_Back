import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateBranchDto {
    _id:number;
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    overview:string;
    @IsString()
    @IsNotEmpty()
    address:string;
    @IsString()
    @IsNotEmpty()
    phone:string;
    @IsEmail()
    @IsNotEmpty()
    email:string;
}
