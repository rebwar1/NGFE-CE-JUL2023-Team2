<!-- !
Create a new database
CREATE DATABASE DriverCheckInDB;

Use the newly created database
USE DriverCheckInDB;

 Create the 'DriverCheckInDB' database
 CREATE DATABASE DriverCheckInDB;
 ! -->

 <!-- !
 Create the table with required columns
CREATE TABLE CheckIns (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
familyName VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
vehicleNumber VARCHAR(255) NOT NULL,
companyName VARCHAR(255) NOT NULL
);

-- Insert the provided values into the table
INSERT INTO CheckIns (name, familyName, email, vehicleNumber, companyName)
VALUES ('Team2', 'Ngfe', 'team2@gmail.com', 'M54J7689', 'traveling co');

-- Update the row with the provided image URL
UPDATE CheckIns

-- Add the 'timestamp' column to the 'CheckIns' table
ALTER TABLE CheckIns
ADD timestamp TIMESTAMP;

-- To create a new user in MySQL
CREATE USER 'rebwa'@'%' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON DriverCheckInDB.\* TO 'rebwa'@'%';
FLUSH PRIVILEGES;

SET imageUrl = 'https://ngfe.s3.eu-west-2.amazonaws.com/123/42cc526f-0efb-4ae4-a2e7-5d89dc5c74db?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMiJHMEUCIDxAiR2rgVTW1Imldd10whXR5n%2BgwSmJLSGx920ohcb5AiEAltEbwLGHPVj0xzbJ9a3t2AqKMsoi%2Fc89z3G4v3mqejUq8QIIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3MzIzMTY1NjQxODAiDK27UjAI0T%2B6GO6EryrFAtSMi%2BPqoQ6O5pnkOdj45rV7SFmfBwW4ZLS%2FkzMdX5AzZtB7Pd5XzlLS6akDYUwpij3exdFIEN1lc286NQD%2BoAGhIUpoZ41VE%2FvfPAW9o%2BzERDBA6IpET%2BDw77WSXYvtb3FBepd0N3i5UUVHiFJw28N0sPZwllKf9z3363yux%2B%2FhhzH0v%2FaaPzK7NoFJpy%2BV85t%2FiiPcC9hqDicRmQm8pK7REraJ%2ByGFViJCttj7ZidqJqiD58s3B8pGPsmx4qiyHjY3oQN9IwehGCvfy5idE%2Bj1hoQMIke8GEfph95dyxEMfpOX8aOkkzVVtHACGPES3WozFq5IjSor%2B2n8NxwGAMeHdHSgWXGgn69Lp4bPDrWbKE8FHjNXNHuHbrV12P2qkOLb1e4rFcq6V4o5te%2BqRFdFbvK2yF05zhshJxOB3FBlv1SeZosw6eG2pwY6swLDf6iTno2PNBYRBVpX6jXQbIJMVkVJCtFB3ghuo1zc3GJPlI7Tq83%2F837m8Q93qaeiyc2%2FSHpTXnjzFNu1z0AAm7kkrBkq%2BsGUmmjTstqypqqTpUyrpeRqUUf9JoMsseGzS4JF4DrPJjGeT69%2FMUyHsGgQINyjzkaza8CiLLsWSQHclbUYcj0KuOrFJXp0VHfFCWDybONud73q53cz5g5nPXhdSMIYL3R7tXuL594tHG%2FOHcKPpwXQ%2FtkaSPgdnzzSIn2Q0tieDKh02P9i1Uq9QOaYGmEaGjc5iE4mlTXrMfVrUnNP5iwgJpBqwwtVgVId07svU7eIZvm65bOQ%2FmeUQ2kBNFqHM3jchlFbxANDxIorevEYj7pHJJoqGTu0j3RVbHCI1alJqLmic6YJLJQT%2FW4a&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230829T134807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIA2VALX7LKBOAHPJFQ%2F20230829%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Signature=4903f6722fc398f2b47e6ada3466ec1a480db555c92f4dc6eb7360172b136028'
WHERE name = 'Team2' AND familyName = 'Ngfe';

SELECT \* FROM CheckIns;

! -->

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

<!-- ? -->
<!-- ! environment.html -->

https://www.123rf.com/stock-photo/health_safety_environment.html

<!-- ! image 1 -->
<!-- ? Standard construction safety equipment on wood background -->

https://previews.123rf.com/images/chatchai8989/chatchai89891707/chatchai8989170700039/81440712-standard-construction-safety-equipment-on-wood-background.jpg

<!-- ! image 2 -->
<!-- ? please Stop smoking concept No smoking sign in the coffee shop go free smoking area -->

https://previews.123rf.com/images/adiruch/adiruch1810/adiruch181000007/108967555-please-stop-smoking-concept-no-smoking-sign-in-the-coffee-shop-go-free-smoking-area.jpg

<!-- ! image 3 -->
<!-- ? Yellow warning caution sign slippery floor is tile -->

https://previews.123rf.com/images/nastenkapeka/nastenkapeka1610/nastenkapeka161000036/65153418-yellow-warning-caution-sign-slippery-floor-is-tile.jpg
