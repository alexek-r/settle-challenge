import * as ratesController from '../controllers/ratesController';
const Joi = require("@hapi/joi")

export const ratesRoutes = [{
    method: 'GET',
    path: '/rates',
    handler: async (request, h) => {
        return await ratesController.getAllRates(request, h);
    },
    config: {
        description: 'Get rates list',
        notes: 'Returns an array of rates',
        tags: ['api']
    }
},
{
    method: 'POST',
    path: '/rates',
    handler: async (request, h) => {
        return await ratesController.createPairRates(request, h);
    },
    config: {
        description: 'Create new rate pair',
        notes: 'Return rate pair with calculate fee',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                responses: {
                    '400': {
                        'description': 'BadRequest'
                    },
                    '200': {
                        'description': 'success'
                    },
                    '500': {
                        'description': 'Error internal server'
                    }
                },
                payloadType: 'form'
            }
        },
        tags: ['api'],
    }
},
{
    method: 'PUT',
    path: '/rates',
    handler: async (request, h) => {
        return await ratesController.putPairRates(request, h);
    },
    options: {
        description: 'Modify rate pair',
        notes: 'Return rate pair modified.',
        tags: ['api'],
    }
}]