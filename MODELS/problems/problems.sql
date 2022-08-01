CREATE TABLE problems (
    problemID int NOT NULL AUTO_INCREMENT,
    problemCode varchar(250) NOT NULL unique,
    problemName varchar(250) NOT NULL unique,
    difficulty ENUM('easy','medium','hard'),
    description Text Not NULL,
    java_code Text Not NULL,
    input_file Text Not Null,
    java_code_runner Text Not Null,
    template_code Text Not Null,
    categoryId int Not NULL,
    PRIMARY KEY (problemID),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId)
);