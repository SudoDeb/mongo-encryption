import { IsNotEmpty, IsString } from "class-validator";

export class GetCustomerDto {
    @IsString()
    @IsNotEmpty()
    customerName: string
}