SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
HAVING reservations.end_date < Now()
ORDER BY reservations.start_date
LIMIT 10;

