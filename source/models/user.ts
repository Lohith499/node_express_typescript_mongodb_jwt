import mongoose, { Schema } from 'mongoose';
import Iuser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Iuser>('Credentials', UserSchema);
