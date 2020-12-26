import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/customers';

let customer = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        mobile: String,
        phone: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICustomer>('Customers', customer);
