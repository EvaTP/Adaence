-- BDD ADAENCE
--************

-- Langage : PostgreSQL
-- crée dans NEON

-- TABLE ELDERS
CREATE TABLE elders (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	firstname TEXT NOT NULL,
	age INT,
	job TEXT,
	city TEXT NOT NULL,
	zipcode VARCHAR(5),
	activity TEXT NOT NULL,
	description TEXT,
	picture TEXT
);

INSERT INTO elders (firstname, age, job, city, zipcode, activity, description, picture)
SELECT 'Franco', 95, 'Ouvrier d"usine', 'Saint-Etienne', 42000, 'un café/thé', 'Franco adore raconter ses souvenirs de l"usine et partager un bon cafe avec les jeunes du quartier', '/images/danie-franco-ClHY-KyvI1M-unsplash.jpg'
UNION SELECT 'Soares', 84, 'Puéricultrice', 'Angers', 49000, 'un repas', 'Soares a consacré sa vie aux tout-petits et aime aujourd’hui transmettre tendresse et conseils de vie', '/images/vladimir-soares-z_8Jqe0Cc-s-unsplash.jpg'
UNION SELECT 'Tim', 80, 'Facteur', 'Aurillac', 15000, 'une promenade', 'Ancien facteur, Tim connaît chaque recoin de sa ville et adore les longues balades en bonne compagnie', '/images/tim-mossholder-FRPbQvAwY10-unsplash.jpg'
UNION SELECT 'Shimo', 94, 'Professeure', 'Besançon', 25000, 'un café/thé', 'Shimo a le cœur sur la main et des tas d’histoires passionnantes à raconter sur ses années d’enseignement.', '/images/shimo-yann-7nTFrV1xQGE-unsplash.jpg';


INSERT INTO elders (firstname, age, job, city, zipcode, activity, description, picture)
VALUES
('Zanon', 86, 'Journaliste', 'Paris', 75011, 'une sortie culturelle', 'Zanon est curieuse du monde et adore échanger autour d’un bon livre ou d’un article d’actualité.', '/images/tatiana-zanon-MMhazsT2wtM-unsplash.jpg')
('Matveev', 77, 'Pilote d"avion', 'Toulouse', 31000, 'une sortie culturelle', 'Pilote à la retraite, Matveev a mille anecdotes à partager sur ses voyages aux quatre coins du monde.', '/images/michael-matveev-Bk8zT4gLLt0-unsplash.jpg');


-- TABLE VOLUNTEERS
CREATE TABLE volunteers (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	firstname TEXT NOT NULL,
	city TEXT NOT NULL,
	zipcode VARCHAR(5),
	activity TEXT NOT NULL
);

-- TABLE ACTIVITIES
CREATE TABLE activities(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	type TEXT
);

INSERT INTO activities (name)
VALUES
('Un café/thé'),
('Un repas'),
('Une promenade'),
('Une sortie culturelle'),
('Autre activité');


-- TABLE CITIES  (12 cities)
CREATE TABLE cities(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	zipcode VARCHAR(5)
);

INSERT INTO cities (name, zipcode)
VALUES
('Saint_Etienne', 42000),
('Angers', 49000),
('Aurillac', 15000),
('Besançon', 25000),
('Paris', 75011),
('Toulouse', 31000),
('Le Mans', 72000),
('Lyon', 69007),
('Quimper', 29000),
('Paris', 75018),
('Bordeaux', 33000),
('Paris', 75014);


CREATE TABLE moments (
    id INTEGER PRIMARY KEY,
    elder_id INTEGER,
    volunteer_id INTEGER,
	activity_id,
	city_id,
	FOREIGN KEY (elder_id) REFERENCES elders(id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteers(id),
	FOREIGN KEY (activity_id) REFERENCES activities(type),
	FOREIGN KEY (city_id) REFERENCES cities(name)
);

-- FK : les relations se font via l'organisation de "moments", pas entre elders et volunteers directement.

INSERT INTO moments(elder_id, volunteer_id, activity_id, city_id)
VALUES
(1, 1, 'un café/thé', 'Saint-Etienne'),
(2, 2, 'un repas', 'Angers'),
(3, 4, 'une promenade', 'Aurillac'),
(4, 3, 'un café/thé', 'Besançon'),
(5, 5, 'une sortie culturelle', 'Paris'),
(6, 2, 'une sortie culturelle', 'Toulouse');




