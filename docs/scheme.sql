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
  current_agent_id INT NULL,
  career_statistics_id INT NULL,
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (current_agent_id) REFERENCES agent_representative (id),
  FOREIGN KEY (career_statistics_id) REFERENCES career_statistics (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS current_contract (
  id INT NOT NULL AUTO_INCREMENT,
  player_id INT NOT NULL UNIQUE,
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
CREATE TABLE IF NOT EXISTS transfer_contract (
  id INT NOT NULL AUTO_INCREMENT,
  transfer_date DATE NOT NULL,
  transfer_fee DECIMAL(12,2) NOT NULL,
  contract_duration_season TINYINT NOT NULL,
  release_clause DECIMAL(10,2) NOT NULL,
  origin_team_id INT NULL,
  destination_team_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (origin_team_id) REFERENCES team (id),
  FOREIGN KEY (destination_team_id) REFERENCES team (id));
  
CREATE TABLE IF NOT EXISTS transfer (
  id INT NOT NULL AUTO_INCREMENT,
  player_id INT NOT NULL UNIQUE,
  transfer_contract_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (player_id) REFERENCES player (id),
  FOREIGN KEY (transfer_contract_id) REFERENCES transfer_contract (id)
);


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
  ('Gianluigi', 'Buffon', '1978-01-28', 5000000, 3, 3, 3),
  ('AntiCristiano', 'Ronaldo', '1985-02-05', 100000000, 1, 1, 1);
  
-- Insert data into the "contract" table first
INSERT INTO contract (start_date, end_date, salary, release_clause, team_id) VALUES
  ('2022-01-01', '2023-01-01', 5000000, 7500000, 1),
  ('2022-02-01', '2023-02-01', 4000000, 6000000, 2),
  ('2022-03-01', '2023-03-01', 1000000, 2000000, 3),
  ('2022-03-01', '2023-03-01', 1000000, 2000000, 1);

-- Insert data into the "current_contract" table
INSERT INTO current_contract (player_id, contract_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);

-- Insert data into the "player_position_assignment" table
INSERT INTO player_position_assignment (player_id, position_id) VALUES
  (1, 1),
  (2, 2),
  (3, 4);


-- Insert data into the "transfer_contract" table
INSERT INTO transfer_contract (transfer_date, transfer_fee, contract_duration_season, release_clause, origin_team_id, destination_team_id) VALUES
  ('2022-01-01', 5000000, 1, 7500000, 1, 2),
  ('2022-02-01', 4000000, 2, 6000000, 2, 3),
  ('2022-03-01', 1000000, 3, 2000000, 3, 1);
  
  -- Insert data into the "transfer" table
INSERT INTO transfer (player_id, transfer_contract_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);



/* Stored Procedures */
DROP PROCEDURE IF EXISTS get_all_players;
DELIMITER //
CREATE PROCEDURE get_all_players()
BEGIN
    SELECT * FROM player;
END //



DROP PROCEDURE IF EXISTS get_player_by_name;
DELIMITER //
CREATE PROCEDURE get_player_by_name(
  IN _first_name VARCHAR(50)  
)
BEGIN
    SELECT
      player.id,
      first_name,
      last_name,
      date_of_birth,
      market_value,
      agent_representative.agent_name,
      country.name as country,
      career_statistics.goals,
      career_statistics.assists,
      career_statistics.matches_played
    FROM player 
    INNER JOIN career_statistics ON player.career_statistics_id = career_statistics.id
    INNER JOIN agent_representative ON player.current_agent_id = agent_representative.id
    INNER JOIN country ON player.country_id = country.id
    WHERE LOWER(first_name) LIKE CONCAT('%', lower(_first_name) , '%');
END //

DROP PROCEDURE IF EXISTS get_players_by_team;
DELIMITER //
CREATE PROCEDURE get_players_by_team(
  IN _team_name VARCHAR(100)
)
BEGIN
    SELECT
      first_name,
      last_name,
      date_of_birth,
      market_value
    FROM player 
    INNER JOIN country ON player.country_id = country.id
    INNER JOIN current_contract ON current_contract.player_id = player.id
    INNER JOIN contract ON contract.id = current_contract.contract_id
    INNER JOIN team ON team.id = contract.team_id
    WHERE team.team_name = _team_name;
END //
DELIMITER ;



DROP PROCEDURE IF EXISTS get_all_teams;
DELIMITER //
CREATE PROCEDURE get_all_teams()
BEGIN
    SELECT 
      team.id,
      team_name,
      budget,
      country.name as country,
      league.league_name as league
    FROM team INNER JOIN country ON team.country_id = country.id
    INNER JOIN league ON team.league_id = league.id;
END //

DROP PROCEDURE IF EXISTS get_team_by_name;
DELIMITER //
CREATE PROCEDURE get_team_by_name(
  IN _team_name VARCHAR(50)
)
BEGIN
    SELECT
      team.id,
      team_name,
      budget,
      country.name as country,
      l1.league_name as league,
      first_name,
      last_name,
      date_of_birth,
      market_value
    FROM team INNER JOIN contract ON team.id = contract.team_id
    INNER JOIN country ON team.country_id = country.id
    INNER JOIN league l1 ON team.league_id = l1.id
    INNER JOIN current_contract ON contract.id = current_contract.contract_id
    INNER JOIN player ON current_contract.player_id = player.id
    INNER JOIN league l2 ON team.league_id = l2.id
    WHERE team_name = _team_name;
END//

DROP PROCEDURE IF EXISTS register_player;
DELIMITER //
CREATE PROCEDURE register_player(
    IN _first_name VARCHAR(50),
    IN _last_name VARCHAR(50),
    IN _date_of_birth DATE,
    IN _market_value DECIMAL(10,2),
    IN _country_id INT
)
BEGIN
    IF (NOT EXISTS (SELECT 0 FROM country WHERE id = _country_id)) THEN
        SELECT "Country not found" as "message";
    END IF;
    IF (EXISTS (SELECT 0 FROM player WHERE first_name = _first_name AND last_name = _last_name)) THEN
        SELECT "Player already exists" as "message";
    END IF;
    INSERT INTO player (first_name, last_name, date_of_birth, market_value, country_id) VALUES
    (_first_name, _last_name, _date_of_birth, _market_value, _country_id);
    SELECT "SUCCESS" as "message";
END //


DROP PROCEDURE IF EXISTS register_team;
DELIMITER //
CREATE PROCEDURE register_team(
    IN _team_name VARCHAR(50),
    IN _budget DECIMAL(10,2),
    IN _country_id INT,
    IN _league_id INT
)
BEGIN
    IF (NOT EXISTS (SELECT 0 FROM country WHERE id = _country_id)) THEN
        SELECT "Country not found" as "message";
    END IF;
    IF (NOT EXISTS (SELECT 0 FROM league WHERE id = _league_id)) THEN
        SELECT "League not found" as "message";
    END IF;
    INSERT INTO team (team_name, budget, country_id, league_id) VALUES
    (_team_name, _budget, _country_id, _league_id);
    SELECT "SUCCESS" as "message";
END //

DROP PROCEDURE IF EXISTS get_all_transfers_by_team_id;
DELIMITER //
CREATE PROCEDURE get_all_transfers_by_team_id(
  IN _team_id INT
  )
BEGIN
    SELECT * FROM transfer_contract
    WHERE origin_team_id = _team_id OR destination_team_id = _team_id;
END //


DROP PROCEDURE IF EXISTS update_player_contract;
DELIMITER //

CREATE PROCEDURE update_player_contract(
  IN _player_id INT,
  IN _start_date DATE,
  IN _end_date DATE,
  IN _salary DECIMAL(10, 2),
  IN _release_clause DECIMAL(10, 2),
  IN _team_id INT
)
BEGIN
  DECLARE new_contract_id INT;

  INSERT INTO contract (start_date, end_date, salary, release_clause, team_id)
  VALUES (_start_date, _end_date, _salary, _release_clause, _team_id);

  SET new_contract_id = LAST_INSERT_ID();

  UPDATE current_contract SET contract_id = new_contract_id
  WHERE player_id = _player_id;
  SELECT "SUCCESS" as "message";
END //
