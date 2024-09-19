import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
    title: string;
    posted_by: mongoose.Schema.Types.ObjectId;
    start_price: number;
    highest_bid: number;
    description: string;
    image: string;
    timing: number;
    start_time_stamp: Date;
    isCompleted: boolean;
}

const ItemSchema: Schema = new Schema({
    title: { type: String, required: true },
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_price: { type: Number, required: true },
    highest_bid: { type: Number, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    timing: { type: Number, required: true },
    start_time_stamp: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false }
});

const Item = mongoose.models.Item ||mongoose.model<IItem>('Item', ItemSchema);
export default Item;
