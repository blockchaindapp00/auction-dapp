import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    public_address: string;
    owned_items: mongoose.Schema.Types.ObjectId[];
    registered_date: Date;
    sold_items: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    public_address: { type: String, required: true },
    owned_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    registered_date: { type: Date, default: Date.now },
    sold_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)   ;
export default User;
