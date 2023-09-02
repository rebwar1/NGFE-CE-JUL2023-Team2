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



-- ! delete rows
DELETE FROM todo WHERE id BETWEEN 1 AND 5;
DELETE FROM todo WHERE id = ?;


DROP USER 'your_username'@'hostname';
DROP USER 'john'@'%';
DROP DATABASE your_database_name;
DROP TABLE table_name;


-- ! more readable
SELECT * FROM CheckIns\G
