import Rates from '../models/Rates';
import { calculateFee } from './feeService';
import { getFeeDB } from '../services/feeService';
import { mockFixerApi } from '../mocks/mockFixerApi';
require("dotenv").config();
import { getApi } from '../rest/fixerApiRest';
import { customException } from '../libs/errorHandler';

const path = "latest?access_key=" + process.env.API_FIXER_KEY + "&format=" + process.env.API_FIXER_FORMAT;

/**
 * Calculate the original rate of the pair using the fee and the fixer response.
 * 
 * @param {String} pair The pair cannot be null.
 * @param {Object} ratesApi The rates api cannot be null.
 * @param {Number} fee The fee cannot be null.
 * @returns {Object} => {pair, originalRate, fee, feeAmount, rateWithMarkUpFee}
 */
const calculateOriginalRate = (pair, ratesApi, fee) => {

    if(pair.length != 6){
        throw new customException("The pair must contain 6 characters.", 400);
    }

    let baseCurrency = pair.substring(3,6);
    let targetCurrency = pair.substring(0,3);

    const { rates } = ratesApi;

    const map = new Map(Object.entries(rates));

    let basePrice, targetPrice, feeResult;

    basePrice = baseCurrency == "EUR" ? 1 : map.get(baseCurrency);
    targetPrice = targetCurrency == "EUR" ? 1 : map.get(targetCurrency);

    if(basePrice == null || targetPrice == null ){
        throw new customException("The base pair or target price not exists.", 400);
    }

    let originalRate = basePrice / targetPrice;

    feeResult = calculateFee(originalRate, fee);

    let rate = {
        pair: pair,
        originalRate: originalRate,
        fee: feeResult.fee,
        feeAmount: feeResult.feeAmount,
        rateWithMarkUpFee: feeResult.rateWithMarkUpFee
    } 

    return rate;
}


const getOne = async (pair) => {

    let ratesFound = null;

    try{
        ratesFound =  await Rates.findOne({pair: pair});
    }catch(error){
        console.error(error);
    }

    return ratesFound
}

/**
 * Get Rates saved in DB
 */
const getRates = async () => {

    try {
        const rates = await Rates.find();
        return rates;
    } catch (error) {
        return error;
    }

}

/**
 * Create the pair and save to database
 * 
 * @param {String} pair, The pair caanot be null.
 * @param {Number} fee, The fee maybe null.
 * @returns {Object} the message result.
 */
const createPair = async (pair, fee) => {

    let responseApi, rate, result = null, feeResult;
    let pairFound = await getOne(pair);

    if(pair == null || pair.length != 6){
        throw new customException("The pair must contain 6 characters", 404);
    }
    
    if(pairFound){
        throw new customException("The pair already exists", 404);
    }

    if(fee == null){
        try {
            feeResult = await getFeeDB(process.env.NAME_EXCHANGE);
        } catch (error) {
            throw new customException("Error get fee in DB: "+ error , 500);
        }
    }else{
        feeResult = fee / 100;
        if(feeResult > 1 || feeResult < 0) {
            throw new customException("Fee must be between 0 and 100", 404);
        } 
    }

    if(process.env.NODE_ENV == "production"){
        responseApi = await getApi(path);
    }else{
        responseApi = mockFixerApi;
    }

    rate = calculateOriginalRate(pair, responseApi, feeResult);

    result = await new Rates(rate).save();

    let response = null;

    if(result === null){
        response = {status: false, code: 404, message: 'Error creating a new rates pair'};
    }else{
        response = {status: true, code: 200, message: "Successfully Created Pair", data: result};
    }

    return response;
}


/**
 * Find the rates and update.
 * 
 * @param {Object} payload 
 * @returns {Object} the message response result.
 */
const ratesFindAndUpdate = async (payload) =>{
    let result = null;
    let response = null;
    const { fee, pair} = payload;

    if(fee == null){
        throw new customException("The fee is required" , 404);
    }

    let feeResult = fee / 100;
        if(feeResult > 1 || feeResult < 0) {
            throw new customException("Fee must be between 0 and 100", 404);
        } 

    if(pair == null || pair.length != 6){
        throw new customException("The pair must contain 6 characters", 404);
    }

 
    let filter = {pair: pair}
 
     if(feeResult && pair){

        let responseApi = await getApi(path);
        let updateRate = calculateOriginalRate(pair, responseApi, feeResult);

         result = await Rates.findOneAndUpdate(filter, {$set: updateRate },{
             returnOriginal: false
           });
     }

        if(result === null){
            response = {status: false, code: 404, message: 'Error modify a rates pair'};
        }else{
            response = {status: true, code: 200, message: "Successfully modify Pair", data: result};
        }
 
     return response;
 }

export { calculateOriginalRate , getRates, createPair, ratesFindAndUpdate};