const mongoose = require('mongoose');
require("dotenv").config();

function connect() { 

    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/settledb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then((res, err) => {
            if(err) return reject(err);
            console.log("Database is Connected")
            resolve();
        })
    })
}

function close() {
    return mongoose.disconnect();
}

export {connect, close};