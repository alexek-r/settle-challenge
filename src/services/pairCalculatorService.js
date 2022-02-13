

const calculateOriginalRate = (pair, ratesApi) => {

    let baseCurrency = pair.substring(3,6); // BRL
    let targetCurrency = pair.substring(0,3); // ARS
    const { rates } = ratesApi;

    const map = new Map(Object.entries(rates));

    let basePrice, targetPrice;

    basePrice = baseCurrency == "EUR" ? 1 : map.get(baseCurrency);
    targetPrice = targetCurrency == "EUR" ? 1 : map.get(targetCurrency);

    let originalRate = basePrice / targetPrice;


    let object = {
        pair: pair,
        originalRate: originalRate,
        fee: 0,
        feeAmount: 0,
        rateWithMarkUpFee: 0
    } 

    return object;
}

export {calculateOriginalRate};