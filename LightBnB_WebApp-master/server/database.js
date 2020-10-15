const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [email])
  .then((res) => {
    return res.rows[0];
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [id])
  .then((res) => {
    return res.rows[0];
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  pool.query(`
  INSERT into users (name, email, password)
  VALUES ($1, $2, $3);
  `, [user.name, user.email, user.password])
  .then((res) => {
    console.log(res)
  });
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [user.email])
  .then((res) => {
    return res.rows[0];
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.city && options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }

  if (!options.city && options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE properties.owner_id = $${queryParams.length} `;
  }

  if (!options.city && !options.owner_id && options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `WHERE properties.cost_per_night >= $${queryParams.length} `;
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  }

  if (options.city && options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  }
  if (!options.city && !options.owner_id && !options.minimum_price_per_night && !options.maximum_price_per_night && options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `WHERE property_reviews.rating >= $${queryParams.length} `;
  }

  if (options.city && options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let extract = Object.keys(property);
  let legalColumns = "owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms".split(', ');
  let extract2 = extract.filter(key => legalColumns.includes(key));
  let tableColummns = extract2.join(", ")
  let propertyKeys = extract2.map(key => property[key]);
  let secureValues = [];
  for (let i = 1; i < propertyKeys.length + 1; i++) {
    secureValues.push('$' + i);
  }
  secureValues = secureValues.join(", ")
  return pool.query(`
  INSERT into properties (${tableColummns})
  VALUES (${secureValues})
  RETURNING *;
  `, propertyKeys)
  .then((res) => {
    (res => res.rows);
  });
}
exports.addProperty = addProperty;
