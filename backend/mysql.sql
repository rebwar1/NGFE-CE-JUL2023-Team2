CREATE DATABASE DriverCheckInDB;
<!-- ? -- Create the 'NGF' user and grant privileges on 'DriverCheckInDB' -->

CREATE USER 'NGF'@'%' IDENTIFIED BY '123';
-- GRANT ALL PRIVILEGES ON DriverCheckInDB.\* TO 'NGF'@'%';
GRANT ALL PRIVILEGES ON DriverCheckInDB.* TO 'NGF'@'%';

FLUSH PRIVILEGES;

<!-- ? -- Switch to the 'DriverCheckInDB' database -->

USE DriverCheckInDB;

-- Create the table with required columns
CREATE TABLE CheckIns (
userId INT AUTO_INCREMENT PRIMARY KEY,
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
    name VARCHAR(255) NOT NULL,
    flag_url VARCHAR(255) NOT NULL,
    language VARCHAR(255) NOT NULL,
    tld VARCHAR(255) NOT NULL,
    voice VARCHAR(255) NOT NULL
);


INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('United Kingdom', 'https://flagcdn.com/w320/gb.png', 'English, British', 'en', 'Emma');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('South Korea', 'https://flagcdn.com/w320/kr.png', 'Korean', 'ko', 'Seoyeon');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('France', 'https://flagcdn.com/w320/fr.png', 'French', 'fr', 'Celine');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('Spain', 'https://flagcdn.com/w320/es.png', 'Spanish', 'es', 'Lucia');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('Germany', 'https://flagcdn.com/w320/de.png', 'German', 'de', 'Marlene');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('Egypt', 'https://flagcdn.com/w320/eg.png', 'Arabic, Gulf', 'ar', 'Hala');

INSERT INTO country_data (name, flag_url, language, tld, voice)
VALUES ('Kurdistan', 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Kurdistan_%28Khoiboun%29.png', 'Kurdish', 'ku', 'Zayd');










-- ! 3rd table for construction_safety  list

CREATE TABLE construction_safety (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/01.png', 'Ensure you follow distancing/hygiene regulations');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/02.png', 'Always wear correct PPE');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/03.png', 'Please remain in your cab until instructed otherwise');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/04.png', 'Drivers must Not enter the vehicle bed from the side');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/05.png', 'Drivers must stand clear of the vehicle while FLT is in operation');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/06.png', 'Use correct manual handling techniques when using on trailers');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/07.png', 'Smoking is only permitted in the designated area');
INSERT INTO construction_safety (image_url, description)
INSERT INTO construction_safety (image_url, description)
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/08.png',
        'Stop and think for 30 seconds,\nHow can I be Injured?\nWhen could it Happen?\nWhat’s the Worst injury that could result?\nHow do I Prevent the accident?\nThink WHAT IF ……?\nThink Not IF ONLY …..');
INSERT INTO construction_safety (image_url, description)
VALUES ('https://ngfimg.s3.eu-west-2.amazonaws.com/EHS/safety.gif', 'Site safety board');




INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/chatchai8989/chatchai89891707/chatchai8989170700039/81440712-standard-construction-safety-equipment-on-wood-background.jpg', 'Standard construction safety equipment on wood background');

INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/adiruch/adiruch1810/adiruch181000007/108967555-please-stop-smoking-concept-no-smoking-sign-in-the-coffee-shop-go-free-smoking-area.jpg', 'Please Stop smoking concept No smoking sign in the coffee shop go free smoking area');

INSERT INTO construction_safety (image_url, description)
VALUES ('https://previews.123rf.com/images/nastenkapeka/nastenkapeka1610/nastenkapeka161000036/65153418-yellow-warning-caution-sign-slippery-floor-is-tile.jpg', 'Yellow warning caution sign slippery floor is tile');



-- ! 4rd table for construction_safety  list
CREATE TABLE Images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  image_key VARCHAR(255) NOT NULL,
  upload_timestamp TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES CheckIns(userId)
);





-- ! delete rows
DELETE FROM todo WHERE id BETWEEN 1 AND 5;
DELETE FROM todo WHERE id = ?;


DROP USER 'your_username'@'hostname';
DROP USER 'john'@'%';
DROP DATABASE your_database_name;
DROP TABLE table_name;


-- ! more readable
SELECT * FROM CheckIns\G
SHOW tables;

















