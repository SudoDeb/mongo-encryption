import { Module } from '@nestjs/common';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './customers.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [CustomerController],
    providers: [CustomerService, CustomersRepository],
})
export class CustomerModule { }
