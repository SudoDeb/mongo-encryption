import { Body, Controller, Headers, Post, Get } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { GetCustomerDto } from './dto/get-customer.dto';
import { User } from './customers.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get('/customers')
  getHello(@Body() dto: GetCustomerDto, @Headers() headers: Headers): Promise<Partial<User[]>> {
    return this.customerService.getCustomerDetails(dto, headers);
  }

  @Post('/customers')
  createCustomers(@Body() dto: CreateCustomerDto, @Headers() headers: Headers): Promise<Partial<User>> {
    return this.customerService.addCustomerDetails(dto, headers);
  }
}
