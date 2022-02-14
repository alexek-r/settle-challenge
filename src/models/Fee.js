import { Schema, model} from 'mongoose';


const feeSchema = new Schema({
    name: { 
        type: String,
        required: true,
    },
    fee: {
        type: Schema.Types.Decimal128,
        required: true,
        get: getDecimal
    }
}, {toJSON: {getters: true}})

//Retrieves the decimal result.
function getDecimal(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

export default model("Fee", feeSchema);