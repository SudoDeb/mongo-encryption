import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Address {
  @Prop() street?: string;
  @Prop() city?: string;
  @Prop() state?: string;
  @Prop() pinCode?: string;
  @Prop() country?: string;
}

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Address })
  address?: Address;

  @Prop()
  phone?: string;

  @Prop({ default: false })
  isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
