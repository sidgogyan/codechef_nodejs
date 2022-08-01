const router=require('express').Router()
const conn=require('../config/db.config')


sqlqueryhandler = (sql) =>{
    return new Promise((resolve, reject)=>{
        conn.query(sql,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};



 



module.exports=router;