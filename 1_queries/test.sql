SELECT cost_per_night
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  -- WHERE city LIKE '%ancouv%'
  -- AND owner_id = 2
  AND properties.cost_per_night >= 5
  AND properties.cost_per_night <= 300
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT 10;


  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES (1, 'title', 'description', 'thumbnail', 'cover', 5, 'street', 'city', 'province', 'post_code', 'country', 5, 5, 5);