var assert = require('assert');
import { describe } from 'mocha';
import * as ratesService from '../../src/services/ratesService';
import Rates from '../../src/models/Rates';
import { connect, close } from '../../src/database';
import { mockFixerApi } from '../../src/mocks/mockFixerApi';
import { customException } from '../../src/libs/errorHandler';
import { illegal } from 'boom';


describe("ratesService testing", function () {

    before((done) => {
        connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        close()
            .then(() => done())
            .catch((err) => done(err));
    })

    describe("Calculate original rate", function () {

        it('when insert correct values ​​then calculate rate successfully', function () {

            //false pair example
            let pair = "ZZZEUR";
            let fee = 0.03;
            let ratesApi = mockFixerApi;

            let expected = {
                pair: "ZZZEUR",
                originalRate: 0.057903792385720784,
                fee: 0.03,
                feeAmount: 0.0017908389397645603,
                rateWithMarkUpFee: 0.059694631325485345
            }

            let response = ratesService.calculateOriginalRate(pair, ratesApi, fee);

            return assert.equal(response.originalRate, expected.originalRate);
        })

        it('when insert incorrect pair length ​​then return throw exception', function () {

            //false pair example
            let pair = "ZZIEUR";
            let fee = 0.03;
            let ratesApi = mockFixerApi;

            return assert.throws(() => ratesService.calculateOriginalRate(pair, ratesApi, fee));
        })

        it('when insert pair not exists ​​then return throw exception', function () {

            //false pair example
            let pair = "ZZZZZZZZZZZZZ";
            let fee = 0.03;
            let ratesApi = mockFixerApi;

            return assert.throws(() => ratesService.calculateOriginalRate(pair, ratesApi, fee));
        })

    });

    describe("Rates mongoose", function () {
        it('Creates a New rate mongoose', (done) => {

            let rate = {
                pair: "ZZZEUR",
                originalRate: 0.057903792385720784,
                fee: 0.03,
                feeAmount: 0.0017908389397645603,
                rateWithMarkUpFee: 0.059694631325485345
            }

            const newFee = new Rates(rate);
            newFee.save() // returns a promise after some time
                .then(() => {
                    //if the fee is saved in db and it is not new
                    assert(!newFee.isNew);
                    done();
                });
        });

        it('Remove Rate using instance', (done) => {
            Rates.deleteOne({pair:'ZZZEUR'})
                .then(() => Rates.findOne({ pair: 'ZZZEUR' }))
                .then((test) => {
                    assert(test === null);
                    done();
                });
        });
    });

});