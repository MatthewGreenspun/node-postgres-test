CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE person(
	id UUID NOT NULL PRIMARY KEY, 
	name VARCHAR(50) NOT NULL, 
	date_of_birth DATE NOT NULL );

-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Tom', DATE '2012-04-23');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Bob', DATE '1988-01-03');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Sam', DATE '1956-12-14');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Anna', DATE '1985-11-04');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Joe', DATE '1996-03-20');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Lily', DATE '2006-03-06');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Rebecca', DATE '2003-11-10');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Matt', DATE '1972-03-22');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Michael', DATE '1984-10-21');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Rose', DATE '1971-07-09');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'David', DATE '1935-06-23');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Jonathan', DATE '1945-09-09');
-- INSERT INTO person (id, name, date_of_birth) VALUES (uuid_generate_v4(), 'Joseph', DATE '2006-05-22');

CREATE TABLE post (
	id UUID NOT NULL PRIMARY KEY,
	person_id UUID NOT NULL REFERENCES person(id),
	post_text VARCHAR(280)
);

-- INSERT INTO post (id, person_id, post_text) VALUES (uuid_generate_v4(), '589ee715-176e-474d-8626-966ede6fc5a1', 'This is my post in the posgres database!');
-- INSERT INTO post (id, person_id, post_text) VALUES (uuid_generate_v4(), '1b3757bd-d3d3-42ac-9be2-f4bbec149732', 'Postgres is the best database!');