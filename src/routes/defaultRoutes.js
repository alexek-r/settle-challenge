export const defaultRoutes = [
    {
        method: 'GET',
        path: '/ping',
        options: {
            handler: (request, h) => {
                return 'pong'
            },
            tags: ['api'],
            description: 'Check health api'
        }
    }
]