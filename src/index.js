const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const { createInitialRates, createInitialFee } = require('./libs/init');
import routes from './routes/routes';
import { connect } from './database';

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const init = async () => {

    await connect();

    const server = new Hapi.Server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    const swaggerOptions = {
        info: {
            title: 'Settle Challenge Documentation',
            version: process.env.VERSION,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log(`Server running on`);

    await createInitialFee();
    await createInitialRates();

    //add routes
    server.route([...routes.routes]);

}

init();