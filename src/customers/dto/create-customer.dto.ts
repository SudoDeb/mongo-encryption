import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    customerName: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phone?: string

}