  USE transfermarket;

  CREATE TABLE IF NOT EXISTS role(
      id TINYINT NOT NULL,
      name VARCHAR(30) NOT NULL,
      PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS user(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      username VARCHAR(15) NOT NULL,
      password CHAR(60) NOT NULL,
      role_id TINYINT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (role_id) REFERENCES role(id)
  );

  CREATE TABLE IF NOT EXISTS guest(
      id INT NOT NULL,
      guest_code CHAR(8),
      PRIMARY KEY (id),
      FOREIGN KEY (id) REFERENCES user(id)
  );
  CREATE TABLE IF NOT EXISTS agent(
      id INT NOT NULL,
      agent_code CHAR(8),
      PRIMARY KEY (id),
      FOREIGN KEY (id) REFERENCES user(id)
  );

  INSERT INTO role (id, name) VALUES
      (1, 'Admin'),
      (2, 'Guest'),
      (3, 'Agent');
  INSERT INTO user (name, last_name, username, password, role_id) VALUES
      ('admin', 'admin', 'admin', '$2a$12$Q5T.nCVyJKABdxraguwbeOTlw2Ra7oaQPT9DE9bVUtOLEMjr1cEE6', 1),
      ('guest', 'guest', 'guest', '$2a$12$LkuI9RN7oxpJ7QkbRSiuceH0CAzl1SSUkWl8A5Rg25NFVim4A.Zc2', 2),
      ('guest1', 'guest1', 'guest1', '$2a$12$0DN4yzg92gS424rsZndQCuyuZVxBSw/S8hANW.kBFdSjSu44WgG1G', 2),
      ('guest2', 'guest2', 'guest2', '$2a$12$cF3kvw0oSDNmgk78/jRo3OEzdFCH4/.cJeqd0y8fcVCw3L2u2U3Bm', 2),
      ('guest3', 'guest3', 'guest3', '$2a$12$1rmH.fGFbiJ.10dkBUM91.er.vO8P.wxczwwxcBvtCMuCTZnJZeZ.', 2),
      ('agent', 'agent', 'agent', '$2a$12$8TeX/756BCExm40Uo5A.1.nhVMCr0B78YW4fSyx/p8CFpIimMXWOq', 3);
  INSERT INTO guest (id, guest_code) VALUES
      (2, 'GU000001'),
      (3, 'GU000002'),
      (4, 'GU000003'),
      (5, 'GU000004');
  INSERT INTO agent (id, agent_code) VALUES
      (6, 'AG000001');


-- FUNCTIONS
DROP FUNCTION IF EXISTS get_next_role_id;
DELIMITER //

CREATE FUNCTION get_next_role_id(_role_id VARCHAR(8))
RETURNS VARCHAR(8)
BEGIN
    DECLARE numbers VARCHAR(6) DEFAULT '';
    DECLARE next_id VARCHAR(6) DEFAULT '';

    SET numbers = RIGHT(_role_id, 6);
    SET next_id = LPAD(CAST((CAST(numbers AS UNSIGNED) + 1) AS CHAR(6)), 6, '0');
    
    RETURN CONCAT(LEFT(_role_id, 2), next_id);
END//
DELIMITER ;
-- STORED PROCEDURES

DROP PROCEDURE IF EXISTS get_password_by_username;
DELIMITER //
CREATE PROCEDURE get_password_by_username(IN _username VARCHAR(15))
BEGIN
    SELECT id, password FROM user
    WHERE username = _username;
END //

DROP PROCEDURE IF EXISTS get_user_data;
DELIMITER //
CREATE PROCEDURE get_user_data(IN _id INT)
BEGIN
    SELECT name, last_name, username, role_id FROM user
    WHERE id = _id;
END //

DROP PROCEDURE IF EXISTS register_user_guest;
DELIMITER //

CREATE PROCEDURE register_user_guest(
  IN _name VARCHAR(50),
  IN _last_name VARCHAR(50),
  IN _username VARCHAR(15),
  IN _password CHAR(60)
)
BEGIN
  DECLARE user_id INT;
  DECLARE last_guest_code CHAR(8);

  IF ( EXISTS (SELECT * FROM user WHERE username = _username) ) THEN
    SELECT "USERNAME_EXISTS" as message;
  ELSE
    INSERT INTO user (name, last_name, username, password, role_id) 
    VALUES (_name, _last_name, _username, _password, 2);
    
    SET user_id = LAST_INSERT_ID();
    SELECT COALESCE(MAX(guest_code), 'GU000001') INTO last_guest_code FROM guest;
    SET @next_guest_code = get_next_role_id(last_guest_code);
    INSERT INTO guest (id, guest_code) VALUES (user_id, @next_guest_code);
    
    SELECT "SUCCESS" as message;
  END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS register_user_agent;
DELIMITER //

CREATE PROCEDURE register_user_agent(
  IN _name VARCHAR(50),
  IN _last_name VARCHAR(50),
  IN _username VARCHAR(15),
  IN _password CHAR(60)
)
BEGIN
  DECLARE user_id INT;
  DECLARE last_agent_code CHAR(8);
  IF ( EXISTS (SELECT * FROM user WHERE username = _username) ) THEN
    SELECT "USERNAME_EXISTS" as message;
  ELSE
    INSERT INTO user (name, last_name, username, password, role_id) 
    VALUES (_name, _last_name, _username, _password, 3);
    SET user_id = LAST_INSERT_ID();
    SELECT COALESCE(MAX(agent_code), 'AG000001') INTO last_agent_code FROM agent; 
    SET @next_agent_code = get_next_role_id(last_agent_code);
    INSERT INTO agent (id, agent_code) VALUES (user_id, @next_agent_code);
    
    SELECT "SUCCESS" as message;
  END IF;
END //

DELIMITER ;



