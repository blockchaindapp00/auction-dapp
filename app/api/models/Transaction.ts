import mongoose, { Document, Schema } from 'mongoose';

interface ICompletedTransaction extends Document {
    item_id: mongoose.Schema.Types.ObjectId;
    from: mongoose.Schema.Types.ObjectId;
    to: mongoose.Schema.Types.ObjectId;
    price: number;
    timestamp: Date;
    fromaddr: string;
    toaddr: string;
}

const CompletedTransactionSchema: Schema = new Schema({
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    fromaddr: { type: String, required: true },
    toaddr: { type: String, required: true }
});

const CompletedTransaction = mongoose.models.CompletedTransaction ||mongoose.model<ICompletedTransaction>('CompletedTransaction', CompletedTransactionSchema);
export default CompletedTransaction;

