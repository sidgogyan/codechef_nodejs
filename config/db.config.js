var mysql = require('mysql');
const env=require("dotenv")

env.config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  });
  
  con.connect(function(err) {
    if (err) {
      console.log(process.env.DATABASE_DATABASE)
    //  console.log(err)
    }
    else{
      console.log("Connected!");
    }
  
  });

  
  module.exports=con;