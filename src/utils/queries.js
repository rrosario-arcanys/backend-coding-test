async function queryDbAll(query, db) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

async function queryInsert(insertQuery, values, getQuery, db) {
  return new Promise((resolve, reject) => {
    db.run(insertQuery, values, function (err) {
      if (err) {
        return reject(err);
      }
      db.all(getQuery, this.lastID, (error, rows) => {
        if (error) {
          return reject(error);
        }

        resolve(rows);
      });
    });
  });
}

module.exports = {
  queryDbAll,
  queryInsert,
};
