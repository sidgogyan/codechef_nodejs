CREATE TABLE submission(
    submissionId int NOT NULL AUTO_INCREMENT,
    code varchar(250) NOT NULL ,
    status varchar(250) NOT NULL,
    verdict varchar(250) NOT NULL,
    userId int,
    problemID int,
    submisson_time DATE NOT NULL, 
    PRIMARY KEY (submissionId),
    FOREIGN KEY (userId) REFERENCES user(userId),
    FOREIGN KEY (problemID) REFERENCES problems(problemID)
);
ALTER TABLE submission AUTO_INCREMENT=10000;