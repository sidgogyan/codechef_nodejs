CREATE TABLE Category (
    categoryID int NOT NULL AUTO_INCREMENT,
    categoryName varchar(250) NOT NULL unique,
    description varchar(250) NOT NULL unique,
    imageLink varchar(250),
    startTime DATE NOT NULL, 
    endTime DATE NOT NULL,
    PRIMARY KEY (categoryID)
)


------------------------------------------------------------------------------------------------------------
