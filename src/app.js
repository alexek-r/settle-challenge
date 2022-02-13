const Hapi = require('@hapi/hapi');
const { createInitialRates } = require('./libs/init');

require('./database');


const init = async () => {

    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log(`Server running on`);

    await createInitialRates();

    server.route({
        method: 'GET',
        path: '/ping',
        handler: (request, h) => {
            return 'pong'
        }
    })
}

init();