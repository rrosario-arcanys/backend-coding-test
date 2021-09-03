module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Backend Exam API Documentation',
    description:
      'This is a simple rides API project used for technical backend exam.',
    version: '1.0.0',
    contact: {
      name: 'Roxenne Lourdes D. Rosario',
      email: 'r.rosario@arcanys.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8010',
    },
  ],

  paths: {
    '/health': {
      get: {
        summary: 'Get health',
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
    },

    '/rides/': {
      post: {
        summary: 'Add a new ride',

        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  start_lat: {
                    type: 'number',
                  },
                  start_long: {
                    type: 'number',
                  },
                  end_lat: {
                    type: 'number',
                  },
                  end_long: {
                    type: 'number',
                  },
                  rider_name: {
                    type: 'string',
                    minLength: 1,
                  },
                  driver_name: {
                    type: 'string',
                    minLength: 1,
                  },
                  driver_vehicle: {
                    type: 'string',
                    minLength: 1,
                  },
                },
              },
            },
          },
        },

        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'BAD REQUEST',
          },
          500: {
            description: 'SERVER_ERROR',
          },
        },
      },
    },

    '/rides/{id}': {
      get: {
        summary: 'Get a ride by ID',

        parameters: [
          {
            schema: {
              type: 'integer',
            },
            name: 'id',
            in: 'path',
            required: true,
            description: 'Numeric ID of the ride to get',
          },
        ],

        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'BAD REQUEST',
          },
          500: {
            description: 'SERVER_ERROR',
          },
        },
      },
    },

    '/rides': {
      get: {
        summary: 'Get all rides',

        parameters: [
          {
            schema: {
              type: 'integer',
            },
            name: 'page',
            in: 'query',
            required: false,
            description:
              'Numeric value of the requested page number. Default is 1',
          },
          {
            schema: {
              type: 'integer',
            },
            name: 'limit',
            in: 'query',
            required: false,
            description:
              ' Numeric value of the number of rides per page. Default is 25',
          },
        ],

        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'BAD REQUEST',
          },
          500: {
            description: 'SERVER_ERROR',
          },
        },
      },
    },
  },
};
