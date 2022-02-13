import { Schema, model } from 'mongoose';

const ratesSchema = new Schema({
    pair: {
        type: String,
        required: true
    },
    originalRate: Schema.Types.Decimal128,
    fee: Schema.Types.Decimal128,
    feeAmount: Schema.Types.Decimal128,
    rateWithMarkUpFee: Schema.Types.Decimal128
})

export default model('Rates', ratesSchema);


// BRL: 5.962951
// ARS: 120.803029
// EUR: 1

// BRLARS = ARS / BRL;
// BRL : 1
// ARS: 

