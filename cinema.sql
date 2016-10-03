SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de donnÃ©es: 'cinema'
--

-- --------------------------------------------------------

drop database if exists cinema;
create database if not exists cinema character set utf8 collate utf8_unicode_ci;
use cinema;

grant all privileges on cinema.* to 'userepul'@'localhost' identified by 'epul';

--
-- Structure de la table 'actor'
--

CREATE TABLE IF NOT EXISTS actor (
  actor_id integer NOT NULL primary key,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) DEFAULT NULL,
  birthday date DEFAULT NULL,
  deathday date DEFAULT NULL
) engine=innodb character set utf8 collate utf8_unicode_ci;

INSERT INTO actor (actor_id, last_name, first_name, birthday, deathday) VALUES
(1, 'Reno', 'Jean', '1948-07-30', NULL),
(2, 'Portman', 'Natalie', '1981-06-09', NULL),
(3, 'Astier', 'Alexandre', '1974-06-16', NULL),
(4, 'Brando', 'Marlon', '1924-04-03', '2004-07-01');

-- --------------------------------------------------------

--
-- Structure de la table 'genre'
--

CREATE TABLE IF NOT EXISTS genre (
  genre_id varchar(2) NOT NULL primary key,
  title varchar(20) NOT NULL
) engine=innodb character set utf8 collate utf8_unicode_ci;

INSERT INTO genre (genre_id, title) VALUES
('AM', 'Action'),
('DR', 'Drama'),
('SF', 'Science Fiction'),
('WS', 'Western');

-- --------------------------------------------------------

--
-- Structure de la table 'diretor'
--

CREATE TABLE IF NOT EXISTS director (
  director_id int(2) NOT NULL primary key,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL
) engine=innodb character set utf8 collate utf8_unicode_ci;

INSERT INTO director (director_id, first_name, last_name) VALUES
(1, 'Francis Ford', 'Coppola');

-- --------------------------------------------------------

--
-- Structure de la table movie
--

CREATE TABLE IF NOT EXISTS movie (
  movie_id integer NOT NULL primary key,
  title varchar(30) NOT NULL,
  duration smallint NOT NULL,
  release_date date NOT NULL,
  fk_director integer NOT NULL,
  fk_genre varchar(2) NOT NULL,
  constraint fk_movie_director foreign key(fk_director) references director(director_id),
  constraint fk_movie_genre foreign key(fk_genre) references genre(genre_id)
) engine=innodb character set utf8 collate utf8_unicode_ci;

INSERT INTO movie (movie_id, title, duration, release_date, fk_director, fk_genre) VALUES
(1, 'The Godfather', 175, '1972-03-14', 1, 'DR');

-- --------------------------------------------------------

--
-- Structure de la table review
--

CREATE TABLE IF NOT EXISTS review (
  id integer NOT NULL primary key,
  fk_movie integer NOT NULL,
  creation date NOT NULL,
  rating tinyint,
  comment text,
  author varchar(25),
  constraint fk_review_movie foreign key(fk_movie) references movie(movie_id)
) engine=innodb character set utf8 collate utf8_unicode_ci;

--
-- Structure de la table 'role'
--

CREATE TABLE IF NOT EXISTS role (
  fk_movie int(4) NOT NULL,
  fk_actor int(4) NOT NULL,
  name varchar(30) NOT NULL,
  CONSTRAINT pk_role PRIMARY KEY (fk_movie, fk_actor),
  CONSTRAINT fk_role_movie FOREIGN KEY (fk_movie) REFERENCES movie (movie_id),
  CONSTRAINT fk_role_actor FOREIGN KEY (fk_actor) REFERENCES actor (actor_id)
) engine=innodb character set utf8 collate utf8_unicode_ci;


INSERT INTO role (fk_movie, fk_actor, name) VALUES
(1, 4, 'Don Vito Corleone');
