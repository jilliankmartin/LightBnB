INSERT INTO users (name, email, password)
VALUES ('Mary Brown', 'mary@mary.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Tom Ford', 'rich@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rob Castle', 'robbo@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ava Stanley', 'avacado@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kit Jones', 'kitty@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sarah Henley', 'sarah@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (3, 'Treehouse', 'description', 'https://www.bobbuescherhomes.com/wp-content/uploads/2018/07/chadwick_floor_plan_exterior.jpg', 'https://cf.bstatic.com/images/hotel/max1024x768/208/208453742.jpg', 100, 1, 1, 1, 'Canada', 'Street', 'Vancouver', 'BC', '1112'),
(3, 'Sand castle', 'description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKH1sdRjt5jP-HF0GGncFfGqZoIURx-XK4Kw&usqp=CAU', 'https://media-cdn.tripadvisor.com/media/vr-splice-j/06/14/e8/33.jpg', 200, 2, 2, 2, 'Australia', 'Street', 'Sydney', 'NSW', '33224'),
(1, 'Mansion', 'description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFLndDwgj1hIAH4kvAGoSAdoFEEZAwftXagw&usqp=CAU', 'https://realestate.boston.com/wp-content/uploads/2020/07/taylor-swift-rhode-island-1024x576.jpg', 300, 3, 3, 3, 'China', 'Street', 'Beijing', 'Ninjiang', '16632');

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 7, '2018-09-11', '2018-09-26'),
(2, 7, '2019-01-04', '2019-02-01'),
(3, 8, '2021-10-01', '2021-10-14'),
(6, 9, '2021-10-10', '2021-10-16'),
(5, 9, '2021-10-20', '2021-11-01');



INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 7, 24, 3, 'message'),
(2, 7, 25, 5, 'message'),
(6, 9, 27, 1, 'message');

