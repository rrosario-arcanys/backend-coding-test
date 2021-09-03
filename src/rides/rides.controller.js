const { STATUS_CODE, MESSAGES } = require('../utils/constants');
const logger = require('../utils/logger');
const { createRideValidation } = require('../utils/validation');
const {
  getAllRides,
  getRideById,
  addRide,
} = require('./rides.service');

const createRide = async (req, res, db) => {
  try {
    const validationError = createRideValidation(req.body);

    if (validationError) {
      logger.error(validationError);
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send(validationError);
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];
    const result = await addRide(values, db);

    if (result.length > 0) {
      return res.send(result);
    } else {
      logger.error(MESSAGES.serverError);
      return res
        .status(STATUS_CODE.SERVER_ERROR)
        .send(MESSAGES.serverError);
    }
  } catch (err) {
    logger.error(MESSAGES.serverError);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send(MESSAGES.serverError);
  }
};

const getRide = async (req, res, db) => {
  try {
    const data = await getRideById(req.params.id, db);

    if (data.length === 0) {
      logger.error(MESSAGES.noRideFound);
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send(MESSAGES.noRideFound);
    }

    return res.send(data);
  } catch (err) {
    logger.error(MESSAGES.serverError);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send(MESSAGES.serverError);
  }
};

const getRides = async (req, res, db) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 25;

    const data = await getAllRides(page, limit, db);

    if (data.length === 0) {
      logger.error(MESSAGES.noRideFound);
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send(MESSAGES.noRideFound);
    }

    return res.send(data);
  } catch (err) {
    logger.error(MESSAGES.serverError);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .send(MESSAGES.serverError);
  }
};

module.exports = {
  getRide,
  getRides,
  createRide,
};
