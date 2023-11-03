USE mysql;

DROP DATABASE IF EXISTS transfermarket;

CREATE DATABASE transfermarket;

USE transfermarket;


CREATE TABLE IF NOT EXISTS career_statistics (
  id INT NOT NULL,
  goals SMALLINT,
  assists SMALLINT,
  matches_played INT,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS country (
  id INT NOT NULL,
  name VARCHAR(45) NULL,
  gentilic VARCHAR(45) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS league (
  id INT NOT NULL,
  league_name VARCHAR(100),
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS agent_representative (
  id INT NOT NULL,
  agent_name VARCHAR(100),
  contact VARCHAR(100),
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (country_id) REFERENCES country (id));


CREATE TABLE IF NOT EXISTS team (
  id INT NOT NULL,
  team_name VARCHAR(100),
  budget DECIMAL(10,2),
  country_id INT NOT NULL,
  league_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (league_id) REFERENCES league (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

CREATE TABLE IF NOT EXISTS contract (
  id INT NOT NULL,
  start_date DATE NULL DEFAULT NULL,
  end_date DATE NULL DEFAULT NULL,
  salary DECIMAL(10,2) NULL DEFAULT NULL,
  release_clause DECIMAL(10,2) NULL DEFAULT NULL,
  team_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES team (id));
  
CREATE TABLE IF NOT EXISTS player_position (
  id INT PRIMARY KEY,
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
  id INT NOT NULL,
  player_id INT NOT NULL,
  contract_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (contract_id) REFERENCES contract (id),
  FOREIGN KEY (player_id) REFERENCES player (id));
  
  CREATE TABLE IF NOT EXISTS player_position_assignment (
  player_id INT,
  position_id INT,
  PRIMARY KEY (player_id, position_id),
  FOREIGN KEY (player_id) REFERENCES player(id),
  FOREIGN KEY (position_id) REFERENCES player_position(id)
);

CREATE TABLE IF NOT EXISTS transfer_contract (
  id INT NOT NULL,
  involved_player_id INT NOT NULL,
  involved_team_id INT NOT NULL,
  transfer_fee DECIMAL(12,2),
  transfer_date DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (involved_player_id) REFERENCES player (id),
  FOREIGN KEY (involved_team_id) REFERENCES team (id));


CREATE TABLE IF NOT EXISTS transfer (
  id INT NOT NULL,
  player_id INT NOT NULL,
  origin_team_id INT NOT NULL,
  destination_team_id INT NOT NULL,
  transfer_fee DECIMAL(10,2),
  transfer_date DATE,
  new_contract_duration_season TINYINT,
  new_release_clause DECIMAL(10,2),
  PRIMARY KEY (id),
  FOREIGN KEY (player_id) REFERENCES player (id),
  FOREIGN KEY (origin_team_id) REFERENCES team (id),
  FOREIGN KEY (destination_team_id) REFERENCES team (id));
