const { queryDbAll, queryInsert } = require('../utils/queries');

const addRide = async (values, db) => {
  const insertQuery =
    'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const getQuery = 'SELECT * FROM Rides WHERE rideID = ?';
  return queryInsert(insertQuery, values, getQuery, db);
};

const getRideById = async (id, db) => {
  const query = `SELECT * FROM Rides WHERE rideID='${id}'`;
  return queryDbAll(query, db);
};

const getAllRides = async (page, limit, db) => {
  const skip = limit * (page - 1);
  const query = `SELECT * FROM Rides LIMIT ${limit} OFFSET ${skip};`;

  return queryDbAll(query, db);
};

module.exports = {
  addRide,
  getRideById,
  getAllRides,
};
