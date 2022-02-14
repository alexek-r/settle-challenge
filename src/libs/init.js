import Rates from '../models/Rates';
import Fee from '../models/Fee';
import { calculateOriginalRate } from '../services/ratesService';
import { getFeeDB } from '../services/feeService';
import { mockFixerApi } from '../mocks/mockFixerApi';
require("dotenv").config();
import { getApi } from '../rest/fixerApiRest';
export const createInitialRates = async () => {

    try {

        let response;

        if (process.env.NODE_ENV !== "production") {
            response = mockFixerApi;
        } else {
            let path = "latest?access_key=" + process.env.API_FIXER_KEY + "&format=" + process.env.API_FIXER_FORMAT;
            response = await getApi(path);
        }

        //check rates created
        const countRates = await Rates.estimatedDocumentCount();
        if (countRates > 0) return;

        let fee = process.env.FEE_EXCHANGUE;
        
        // insert rates to bd
        const values = await Promise.all([
            new Rates(calculateOriginalRate("EURUSD", response, fee)).save(),
            new Rates(calculateOriginalRate("EURARS", response, fee)).save(),
            new Rates(calculateOriginalRate("USDARS", response, fee)).save(),
            new Rates(calculateOriginalRate("EURBRL", response, fee)).save(),
            new Rates(calculateOriginalRate("USDBRL", response, fee)).save(),
            new Rates(calculateOriginalRate("BRLARS", response, fee)).save()
        ])

        console.log("Initial rates succesfully ", values);

    } catch (err) {
        console.error("Error to createInitialRates, error:", err);
    }

}

export const createInitialFee = async () => {

    try {
        //check fee created
        const countFee = await Fee.estimatedDocumentCount();
        if (countFee > 0) return;

        const value = await new Fee({ name: process.env.NAME_EXCHANGE, fee: { '$numberDecimal': process.env.FEE_EXCHANGUE } }).save();
        console.log("Initial fee created succesfully", value);
    } catch (error) {
        console.error("Error to createInitialFee, error: ", error);
    }


}