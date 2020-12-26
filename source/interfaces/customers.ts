import { Document } from 'mongoose';
export default interface ICustomer extends Document {
    username: string;
    password: string;
}
