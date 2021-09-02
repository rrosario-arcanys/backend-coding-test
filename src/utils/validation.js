const { MESSAGES } = require('./constants');

const createRideValidation = (bodyData) => {
  const startLatitude = Number(bodyData.start_lat);
  const startLongitude = Number(bodyData.start_long);
  const endLatitude = Number(bodyData.end_lat);
  const endLongitude = Number(bodyData.end_long);
  const riderName = bodyData.rider_name;
  const driverName = bodyData.driver_name;
  const driverVehicle = bodyData.driver_vehicle;

  if (
    startLatitude < -90 ||
    startLatitude > 90 ||
    startLongitude < -180 ||
    startLongitude > 180
  ) {
    return MESSAGES.startLatLongError;
  }

  if (
    endLatitude < -90 ||
    endLatitude > 90 ||
    endLongitude < -180 ||
    endLongitude > 180
  ) {
    return MESSAGES.endLatLongError;
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    return MESSAGES.riderNameError;
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    return MESSAGES.riderNameError;
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    return MESSAGES.riderNameError;
  }
};

module.exports = {
  createRideValidation,
};
