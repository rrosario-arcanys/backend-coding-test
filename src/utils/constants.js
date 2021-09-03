const MESSAGES = {
  serverError: {
    error_code: 'SERVER_ERROR',
    message: 'Unknown error',
  },

  noRideFound: {
    error_code: 'RIDES_NOT_FOUND_ERROR',
    message: 'Could not find any rides',
  },

  startLatLongError: {
    error_code: 'VALIDATION_ERROR',
    message:
      'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },

  endLatLongError: {
    error_code: 'VALIDATION_ERROR',
    message:
      'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  },

  riderNameError: {
    error_code: 'VALIDATION_ERROR',
    message: 'Rider name must be a non empty string',
  },
};

const STATUS_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

module.exports = {
  MESSAGES,
  STATUS_CODE,
};
