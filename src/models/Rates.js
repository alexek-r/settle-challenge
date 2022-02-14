import { Schema, model } from 'mongoose';

const ratesSchema = new Schema({
    pair: {
        type: String,
        required: true
    },
    originalRate: { 
        type: Schema.Types.Decimal128,
        default: 0,
        get: getDecimal
    },
    fee: { 
        type: Schema.Types.Decimal128,
        default: 0,
        get: getDecimal
    },
    feeAmount: { 
        type: Schema.Types.Decimal128,
        default: 0,
        get: getDecimal
    },
    rateWithMarkUpFee: { 
        type: Schema.Types.Decimal128,
        default: 0,
        get: getDecimal
    },
    id: false
}, {toJSON: {getters: true}});

function getDecimal(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

export default model('Rates', ratesSchema);

