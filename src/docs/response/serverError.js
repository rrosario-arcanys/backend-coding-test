module.exports = {
  500: {
    description: 'Server Error',
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
          'Unknown Error': {
            value: {
              error_code: 'SERVER_ERROR',
              message: 'Unknown error',
            },
          },
        },
      },
    },
  },
};
