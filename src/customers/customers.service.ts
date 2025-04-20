import { Injectable } from '@nestjs/common';
import { GetCustomerDto } from './dto/get-customer.dto';
import { User } from './customers.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersRepository } from './customers.repository';

@Injectable()
export class CustomerService {
  constructor(
    private readonly repository: CustomersRepository
  ) { }
  getCustomerDetails(dto: GetCustomerDto, headers: Headers): Promise<Partial<User[]>> {
    console.log('request headers',headers)
    return this.repository.getCustomerDetails(dto);
  }
  addCustomerDetails(dto: CreateCustomerDto, headers: Headers): Promise<Partial<User>>  {
    console.log('request headers',headers)
    return this.repository.addCustomerDetails(dto);
  }
}
