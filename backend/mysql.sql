CREATE DATABASE DriverCheckInDB;
<!-- ? -- Create the 'NGF' user and grant privileges on 'DriverCheckInDB' -->

CREATE USER 'NGF'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON DriverCheckInDB.\* TO 'NGF'@'%';
FLUSH PRIVILEGES;

<!-- ? -- Switch to the 'DriverCheckInDB' database -->

USE DriverCheckInDB;

-- Create the table with required columns
CREATE TABLE CheckIns (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
familyName VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
vehicleNumber VARCHAR(255) NOT NULL,
companyName VARCHAR(255) NOT NULL,
timestamp TIMESTAMP
);

-- Insert the provided values into the table with a proper timestamp
INSERT INTO CheckIns (name, familyName, email, vehicleNumber, companyName, timestamp)
VALUES ('Team2', 'Ngfe', 'team2@gmail.com', 'M54J7689', 'traveling co', '2023-09-02 00:00:00');



--  ! 2nd table for country_data

CREATE TABLE country_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_common VARCHAR(255) NOT NULL,
    flag_url VARCHAR(255) NOT NULL,
    language VARCHAR(255) NOT NULL
);
INSERT INTO country_data (name_common, flag_url, language)
VALUES ('United Kingdom', 'https://flagcdn.com/w320/gb.png', 'English');

INSERT INTO country_data (name_common, flag_url, language)
VALUES ('South Korea', 'https://flagcdn.com/w320/kr.png', 'Korean');

INSERT INTO country_data (name_common, flag_url, language)
VALUES ('France', 'https://flagcdn.com/w320/fr.png', 'French');

INSERT INTO country_data (name_common, flag_url, language)
VALUES ('Spain', 'https://flagcdn.com/w320/es.png', 'Spanish');

INSERT INTO country_data (name_common, flag_url, language)
VALUES ('Germany', 'https://flagcdn.com/w320/de.png', 'German');



-- ! 3rd table for construction_safety  list

CREATE TABLE construction_safety (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    description TEXT
);
INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/chatchai8989/chatchai89891707/chatchai8989170700039/81440712-standard-construction-safety-equipment-on-wood-background.jpg', 'Standard construction safety equipment on wood background');

INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/adiruch/adiruch1810/adiruch181000007/108967555-please-stop-smoking-concept-no-smoking-sign-in-the-coffee-shop-go-free-smoking-area.jpg', 'Please Stop smoking concept No smoking sign in the coffee shop go free smoking area');

INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/nastenkapeka/nastenkapeka1610/nastenkapeka161000036/65153418-yellow-warning-caution-sign-slippery-floor-is-tile.jpg', 'Yellow warning caution sign slippery floor is tile');






-- ! delete rows
DELETE FROM todo WHERE id BETWEEN 1 AND 5;
DELETE FROM todo WHERE id = ?;


DROP USER 'your_username'@'hostname';
DROP USER 'john'@'%';
DROP DATABASE your_database_name;
DROP TABLE table_name;


-- ! more readable
SELECT * FROM CheckIns\G
