module.exports = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          description: '',
          type: 'object',
          properties: {
            error_code: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          required: ['error_code', 'message'],
        },
        examples: {
          'invalid start lat and long': {
            value: {
              error_code: 'VALIDATION_ERROR',
              message:
                'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            },
          },
          'invalid end lat and long': {
            value: {
              error_code: 'VALIDATION_ERROR',
              message:
                'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            },
          },

          'invalid name': {
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string',
          },
        },
      },
    },
  },
};
