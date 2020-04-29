INSERT INTO users (name, email, password) VALUES (
 'Lucy Liu', 
 'lucyliu@gmail.com', 
 '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
),
(
 'Jane Smith', 
 'js@gmail.com', 
 '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
),
(
 'Beyonce Knowles', 
 'bk@gmail.com', 
 '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
);

INSERT INTO properties (
owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, 
parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, 
city, province, post_code, active ) VALUES (
 3, 
'Fun glad', 
'description',
 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 
 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 
 34291,
 6,
 6,
 4,
 'Canada',
 '169 Nuwug Circle',
 'Vutgapha', 
 'Newfoundland And Labrador',
 '00159',
 true
),
(
 1,
'The Toronto Star', 
'description',
 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350',
 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg',
 34292,
 6,
 6,
 4,
 'Canada',
 '234 Wonderful Street',
 'Toronto', 
 'Ontario',
 'M5J 2P1',
 true
),
(
 2,
'Place Ville Marie', 
'description',
 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350',
 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg',
 34293,
 6,
 6,
 4,
 'Canada',
 '123 Amazing Street',
 'Montreal', 
 'Quebec',
 'H2A 2A2',
 true
);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES (
 TO_DATE('2018-09-11', 'YYYY-MM-DD'),
 TO_DATE('2018-09-26', 'YYYY-MM-DD'),
 2,
 3
 ),
(
 TO_DATE(' 2019-01-04', 'YYYY-MM-DD'),
 TO_DATE('2019-02-01', 'YYYY-MM-DD'),
 2,
 2
 ),
(
 TO_DATE('2021-10-01', 'YYYY-MM-DD'),
 TO_DATE('2021-10-14', 'YYYY-MM-DD'),
 1,
 1
 );

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (
 3,
 2,
 1,
 5,
 'messages'
),
(
 1,
 1,
 3,
 4,
 'messages'
),
(
 2,
 2,
 2,
 5,
 'messages'
);
