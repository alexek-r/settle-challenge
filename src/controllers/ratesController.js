
import * as ratesService from '../services/ratesService';

const createPairRates = async (req, h) => {

    try {

        if(!req.payload){
            return h.response({ message: "The body is required" }).code(400);
        }

        let pair = req.payload.pair.toUpperCase();
        let fee = req.payload.fee;

        let result = await ratesService.createPair(pair, fee);

        if (result.status === false) {
            return h.response({ message: result.message }).code(result.code);
        } else {
            return h.response({ message: result.message, data: result.data }).code(result.code);
        }

    } catch (error) {
        return h.response({ message: error.message }).code(error.code);
    }
}


const putPairRates = async (req, h) => {


    try {

        if(!req.payload){
            return h.response({ message: "The body is required" }).code(400);
        }

        let result = await ratesService.ratesFindAndUpdate(req.payload);

        if (result.status === false) {
            return h.response({ message: result.message }).code(result.code);
        } else {
            return h.response({ message: result.message, data: result.data }).code(result.code);
        }

    } catch (error) {
        return h.response({ message: error.message }).code(error.code);
    }

}


const getAllRates = async (req, h) => {

    try {
        let result = await ratesService.getRates();

        if (result) {
            return h.response(result);
        } else {
            return h.response(error).code(404);
        }

    } catch (error) {
        return h.response({ message: error.message }).code(error.code);
    }
}

export { createPairRates, getAllRates, putPairRates};