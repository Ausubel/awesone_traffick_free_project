USE mysql;

DROP DATABASE IF EXISTS transfermarket;

CREATE DATABASE transfermarket;

USE transfermarket;

CREATE TABLE IF NOT EXISTS career_statistics (
  id INT NOT NULL AUTO_INCREMENT,
  goals SMALLINT,
  assists SMALLINT,
  matches_played INT,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS country (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  gentilic VARCHAR(45) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS league (
  id INT NOT NULL AUTO_INCREMENT,
  league_name VARCHAR(100),
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS agent_representative (
  id INT NOT NULL AUTO_INCREMENT,
  agent_name VARCHAR(100),
  contact VARCHAR(100),
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (country_id) REFERENCES country (id));


CREATE TABLE IF NOT EXISTS team (
  id INT NOT NULL AUTO_INCREMENT,
  team_name VARCHAR(100),
  budget DECIMAL(10,2),
  country_id INT NOT NULL,
  league_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (league_id) REFERENCES league (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS contract (
  id INT NOT NULL AUTO_INCREMENT,
  start_date DATE NULL DEFAULT NULL,
  end_date DATE NULL DEFAULT NULL,
  salary DECIMAL(10,2) NULL DEFAULT NULL,
  release_clause DECIMAL(10,2) NULL DEFAULT NULL,
  team_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES team (id));
  
CREATE TABLE IF NOT EXISTS player_position (
  id INT PRIMARY KEY AUTO_INCREMENT,
  position_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS player (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NULL DEFAULT NULL,
  last_name VARCHAR(50) NULL DEFAULT NULL,
  date_of_birth DATE NULL DEFAULT NULL,
  market_value DECIMAL(12,2) NULL DEFAULT NULL,
  current_agent_id INT NOT NULL,
  career_statistics_id INT NOT NULL,
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (current_agent_id) REFERENCES agent_representative (id),
  FOREIGN KEY (career_statistics_id) REFERENCES career_statistics (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS current_contract (
  id INT NOT NULL AUTO_INCREMENT,
  player_id INT NOT NULL,
  contract_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (contract_id) REFERENCES contract (id),
  FOREIGN KEY (player_id) REFERENCES player (id));
  
  CREATE TABLE IF NOT EXISTS player_position_assignment (
  player_id INT AUTO_INCREMENT,
  position_id INT,
  PRIMARY KEY (player_id, position_id),
  FOREIGN KEY (player_id) REFERENCES player(id),
  FOREIGN KEY (position_id) REFERENCES player_position(id)
);
CREATE TABLE IF NOT EXISTS transfer (
  id INT NOT NULL AUTO_INCREMENT,
  transfer_date DATE NULL DEFAULT NULL,
  origin_team_id INT NULL,
  destination_team_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (origin_team_id) REFERENCES team (id),
  FOREIGN KEY (destination_team_id) REFERENCES team (id));
CREATE TABLE IF NOT EXISTS transfer_contract (
  id INT NOT NULL AUTO_INCREMENT,
  transfer_fee DECIMAL(12,2) NULL DEFAULT NULL,
  contract_duraction_season TINYINT NULL,
  release_clause DECIMAL(10,2) NULL,
  player_id INT NOT NULL,
  transfer_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (player_id) REFERENCES player (id),
  FOREIGN KEY (transfer_id) REFERENCES transfer (id));


-- Insert data into the "country" table
INSERT INTO country (name, gentilic) VALUES
  ('Spain', 'Spanish'),
  ('England', 'English'),
  ('Italy', 'Italian');

-- Insert data into the "league" table
INSERT INTO league (league_name, country_id) VALUES
  ('La Liga', 1),
  ('Premier League', 2),
  ('Serie A', 3);

-- Insert data into the "agent_representative" table
INSERT INTO agent_representative (agent_name, contact, country_id) VALUES
  ('Agent 1', 'agent1@example.com', 1),
  ('Agent 2', 'agent2@example.com', 2),
  ('Agent 3', 'agent3@example.com', 3);

-- Insert data into the "team" table
INSERT INTO team (team_name, budget, country_id, league_id) VALUES
  ('Real Madrid', 50000000, 1, 1),
  ('Manchester United', 60000000, 2, 2),
  ('Juventus', 55000000, 3, 3);

-- Insert data into the "player_position" table
INSERT INTO player_position (position_name) VALUES
  ('Forward'),
  ('Midfielder'),
  ('Defender'),
  ('Goalkeeper');
  
-- Insert data into the "career_statistics" table first
INSERT INTO career_statistics (goals, assists, matches_played) VALUES
  (10, 5, 20),
  (5, 10, 15),
  (0, 0, 0);

-- Insert data into the "player" table
INSERT INTO player (first_name, last_name, date_of_birth, market_value, current_agent_id, career_statistics_id, country_id) VALUES
  ('Cristiano', 'Ronaldo', '1985-02-05', 100000000, 1, 1, 1),
  ('Paul', 'Pogba', '1993-03-15', 80000000, 2, 2, 2),
  ('Gianluigi', 'Buffon', '1978-01-28', 5000000, 3, 3, 3);
  
-- Insert data into the "contract" table first
INSERT INTO contract (start_date, end_date, salary, release_clause, team_id) VALUES
  ('2022-01-01', '2023-01-01', 5000000, 7500000, 1),
  ('2022-02-01', '2023-02-01', 4000000, 6000000, 2),
  ('2022-03-01', '2023-03-01', 1000000, 2000000, 3);

-- Insert data into the "current_contract" table
INSERT INTO current_contract (player_id, contract_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

-- Insert data into the "player_position_assignment" table
INSERT INTO player_position_assignment (player_id, position_id) VALUES
  (1, 1),
  (2, 2),
  (3, 4);

-- Insert data into the "transfer" table
INSERT INTO transfer (transfer_date, origin_team_id, destination_team_id) VALUES
  ('2023-01-15', 1, 2),
  ('2023-02-20', 2, 3),
  ('2023-03-10', 3, 1);

-- Insert data into the "transfer_contract" table
INSERT INTO transfer_contract (transfer_fee, contract_duraction_season, release_clause, player_id, transfer_id) VALUES
  (50000000, 3, 75000000, 1, 1),
  (60000000, 4, 90000000, 2, 2),
  (3000000, 2, 5000000, 3, 3);

/* Stored Procedures */
DROP PROCEDURE IF EXISTS get_all_players;
DELIMITER //
CREATE PROCEDURE get_all_players()
BEGIN
    SELECT * FROM player;
END //