CREATE TABLE user (
    userId int NOT NULL AUTO_INCREMENT,
    userName varchar(250) NOT NULL unique,
    email varchar(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    isAdmin boolean NOT NULL default false,
    PRIMARY KEY (userId)
);