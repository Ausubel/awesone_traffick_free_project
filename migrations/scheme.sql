USE mysql;

CREATE DATABASE IF NOT EXISTS transfermarket;
-- DROP DATABASE transfermarket;
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



CREATE TABLE IF NOT EXISTS current_contract (
  id INT NOT NULL,
  current_team_id INT NOT NULL,
  start_date DATE,
  end_date DATE,
  salary DECIMAL(10,2),
  release_clause DECIMAL(10,2),
  PRIMARY KEY (id),
  FOREIGN KEY (current_team_id) REFERENCES team (id));

CREATE TABLE IF NOT EXISTS player_position (
  id INT PRIMARY KEY,
  position_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS player (
  id INT NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  date_of_birth DATE,
  market_value DECIMAL(12,2),
  current_contract_id INT NOT NULL,
  current_agent_id INT NOT NULL,
  career_statistics_id INT NOT NULL,
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (current_contract_id) REFERENCES current_contract (id),
  FOREIGN KEY (current_agent_id) REFERENCES agent_representative (id),
  FOREIGN KEY (career_statistics_id) REFERENCES career_statistics (id),
  FOREIGN KEY (country_id) REFERENCES country (id));

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
  

INSERT INTO career_statistics (id, goals, assists, matches_played) VALUES
(1, 10, 5, 20),
(2, 15, 8, 25),
(3, 5, 2, 15),
(4, 20, 10, 30),
(5, 8, 4, 18),
(6, 12, 6, 22);


INSERT INTO country (id, name, gentilic) VALUES
(1, 'Spain', 'Spanish'),
(2, 'England', 'English'),
(3, 'Italy', 'Italian'),
(4, 'Germany', 'German'),
(5, 'France', 'French'),
(6, 'Portugal', 'Portuguese');


INSERT INTO league (id, league_name, country_id) VALUES
(1, 'La Liga', 1),
(2, 'Premier League', 2),
(3, 'Serie A', 3),
(4, 'Bundesliga', 4),
(5, 'Ligue 1', 5),
(6, 'Primeira Liga', 6);


INSERT INTO agent_representative (id, agent_name, contact, country_id) VALUES
(1, 'Agent 1', 'agent1@example.com', 1),
(2, 'Agent 2', 'agent2@example.com', 2),
(3, 'Agent 3', 'agent3@example.com', 3),
(4, 'Agent 4', 'agent4@example.com', 4),
(5, 'Agent 5', 'agent5@example.com', 5),
(6, 'Agent 6', 'agent6@example.com', 6);


INSERT INTO team (id, team_name, budget, country_id, league_id) VALUES
(1, 'Team 1', 10000000.00, 1, 1),
(2, 'Team 2', 8000000.00, 2, 2),
(3, 'Team 3', 12000000.00, 3, 3),
(4, 'Team 4', 9000000.00, 4, 4),
(5, 'Team 5', 7500000.00, 5, 5),
(6, 'Team 6', 11000000.00, 6, 6);


INSERT INTO current_contract (id, current_team_id, start_date, end_date, salary, release_clause) VALUES
(1, 1, '2023-01-01', '2024-12-31', 2000000.00, 5000000.00),
(2, 2, '2023-02-01', '2024-12-31', 2500000.00, 6000000.00),
(3, 3, '2023-03-01', '2024-12-31', 1800000.00, 4500000.00),
(4, 4, '2023-04-01', '2024-12-31', 2200000.00, 5500000.00),
(5, 5, '2023-05-01', '2024-12-31', 1700000.00, 4000000.00),
(6, 6, '2023-06-01', '2024-12-31', 2100000.00, 5500000.00);


INSERT INTO player_position (id, position_name) VALUES
(1, 'Forward'),
(2, 'Midfielder'),
(3, 'Defender'),
(4, 'Goalkeeper'),
(5, 'Winger');


INSERT INTO player (id, first_name, last_name, date_of_birth, market_value, current_contract_id, current_agent_id, career_statistics_id, country_id) VALUES
(1, 'Player 1', 'Lastname 1', '1990-05-15', 30000000.00, 1, 1, 1, 1),
(2, 'Player 2', 'Lastname 2', '1992-07-20', 35000000.00, 2, 2, 2, 2),
(3, 'Player 3', 'Lastname 3', '1988-03-10', 28000000.00, 3, 3, 3, 3),
(4, 'Player 4', 'Lastname 4', '1995-11-02', 32000000.00, 4, 4, 4, 4),
(5, 'Player 5', 'Lastname 5', '1993-09-25', 26000000.00, 5, 5, 5, 5),
(6, 'Player 6', 'Lastname 6', '1991-12-08', 31000000.00, 6, 6, 6, 6);


INSERT INTO player_position_assignment (player_id, position_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 1),
(4, 2),
(4, 5),
(5, 3),
(5, 1),
(6, 2),
(6, 4);


INSERT INTO transfer_contract (id, involved_player_id, involved_team_id, transfer_fee, transfer_date) VALUES
(1, 1, 2, 15000000.00, '2023-08-10'),
(2, 2, 3, 18000000.00, '2023-07-15'),
(3, 3, 4, 14000000.00, '2023-06-20'),
(4, 4, 5, 17000000.00, '2023-05-25'),
(5, 5, 6, 13000000.00, '2023-09-05'),
(6, 6, 1, 16000000.00, '2023-10-12');

INSERT INTO transfer (id, player_id, origin_team_id, destination_team_id, transfer_fee, transfer_date, new_contract_duration_season, new_release_clause) VALUES
(1, 1, 2, 3, 12000000.00, '2023-08-15', 4, 18000000.00),
(2, 2, 3, 4, 14000000.00, '2023-07-20', 3, 20000000.00),
(3, 3, 4, 5, 11000000.00, '2023-06-25', 5, 15000000.00),
(4, 4, 5, 6, 13000000.00, '2023-05-30', 2, 22000000.00),
(5, 5, 6, 1, 10000000.00, '2023-09-10', 4, 16000000.00),
(6, 6, 1, 2, 12000000.00, '2023-10-15', 3, 19000000.00);