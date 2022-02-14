var assert = require('assert');
import { describe } from 'mocha';
import * as feeService from '../../src/services/feeService';
import Fee from '../../src/models/Fee';
import { connect, close } from '../../src/database';

describe("FeeService testing", function () {

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

    describe("calculateFee", function () {

        it('when insert correct values ​​then calculate fee successfully', function () {

            let value = 100;
            let fee = 0.03;

            let expected = {
                fee: 0.03,
                feeAmount: 3.0927835051546393,
                rateWithMarkUpFee: 103.09278350515464,
            }

            let response = feeService.calculateFee(value, fee);
            
            assert.equal(response.fee,expected.fee);
            assert.equal(response.feeAmount,expected.feeAmount);
            assert.equal(response.rateWithMarkUpFee,expected.rateWithMarkUpFee);
        }),

            it('when insert null values ​​then return null', function (done) {

                let value = null;
                let fee = 0.03;

                let response = feeService.calculateFee(value, fee);

                assert.equal(response, null);
                done();
            });

        it('when insert null fee ​​then return null', function (done) {

            let value = 100;
            let fee = null;

            let response = feeService.calculateFee(value, fee);

            assert.equal(response, null);
            done();
        });

    });

    describe("Fee mongoose", function () {
        it('Creates a New Fee', (done) => {
            const newFee = new Fee({ name: 'test', fee: 0.01 });
            newFee.save() // returns a promise after some time
                .then(() => {
                    //if the fee is saved in db and it is not new
                    assert(!newFee.isNew);
                    done();
                });
        });

        it('Remove fee using its instance', (done) => {

            Fee.deleteOne({name: 'test'})
                // Checking if the user was deleted from DB or not
                .then(() => Fee.findOne({ name: 'test' }))
                .then((test) => {
                    assert(test === null);
                    done();
                });
        });
    });

});