const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'vagrant',
  password: '234',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {

  return pool.query(`
    SELECT * FROM users 
    where email = $1 
  `, [email])
    .then(res => res.rows[0] || null)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {

  return pool.query(`
  SELECT * FROM users 
  where id = $1 
`, [id])
    .then(res => res.rows[0] || null)
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {

  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *
`, [user.name, user.email, user.password])
    .then(res => res.rows[0]);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  return pool.query(`
  SELECT * FROM reservations
  join properties on property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2
  `, [guest_id, limit])
    .then(res => res.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {

  // return pool.query(`
  // SELECT * FROM properties
  // LIMIT $1
  // `, [limit])
  //   .then(res => res.rows)


  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night >= $${queryParams.length} * 100 `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night <= $${queryParams.length} * 100 `;
  }

  queryString += `
  GROUP BY properties.id 
  `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

//  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {

  let queryParams = [];
  console.log(property);
  let queryString = `INSERT INTO properties (`;

  Object.keys(property).forEach(param => queryString += param + `, `);
  queryString = queryString.slice(0, -2) + `) values (`;
  Object.keys(property).forEach(param => {
        queryParams.push(property[param] || 0);
        queryString += `$${queryParams.length}, `;
    });
  queryString = queryString.slice(0, -2) + `) RETURNING * `;
  console.log("result! ", queryString);

  return pool.query(queryString, queryParams)
    .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
