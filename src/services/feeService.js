
import Fee from '../models/Fee';
require("dotenv").config();

const calculateFee = (value, feePorcent) => {

    let porcent, feeAmount, rateWithFee, response;

    if (feePorcent && value) {
        porcent = 1 - feePorcent;
        feeAmount = (value / porcent) * feePorcent;
        rateWithFee = value + feeAmount;

        response = {
            fee: feePorcent,
            feeAmount: feeAmount,
            rateWithMarkUpFee: rateWithFee
        }

        return response;
    } else {
        return null;
    }

}

const getFeeDB = async (name) => {

    let feeFound = null;

    try{
        feeFound =  await Fee.findOne({name: name});
        return feeFound.fee;
    }catch(error){
        console.error(error);
    }

    return feeFound
}


export { getFeeDB, calculateFee };

