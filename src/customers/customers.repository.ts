import { Injectable } from "@nestjs/common";
import { User } from "./customers.entity";
import { GetCustomerDto } from "./dto/get-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }
    async getCustomerDetails(dto: GetCustomerDto): Promise<Partial<User[]>> {
        return this.userModel.find({ name: dto.customerName }, { _id: 0, __v: 0 }).exec()
    }

    async addCustomerDetails(dto: CreateCustomerDto): Promise<Partial<User>> {
        return this.userModel.create(
            {
                name: dto.customerName,
                email: dto.email,
                password: dto.password,
                phone: dto?.phone
            }
        )
    }
}