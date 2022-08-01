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



 

router.post("/",async(req,res)=>{
   const {categoryName,description,imageLink,startTime,endTime}=req.body
   
   try{
    const sql=`Insert Into category values (NULL,${categoryName},${description},${imageLink},${startTime},${endTime})`


    
   const data= await sqlqueryhandler(sql)
   

  return data ? res.status(200).json({"message":"category added sucessfully"}):res.status(500).json({"error":"something went wrong"});
   }
   catch(e){
    return res.status(400).json({"error":e.sqlMessage})
   }
})


router.get("/",async(req,res)=>{
    
    try{
     const sql=`select * from category`
 
 
     
    const data= await sqlqueryhandler(sql)
    
 
   return data ? res.status(200).json({"message":data}):res.status(500).json({"error":"something went wrong"});
    }
    catch(e){
     return res.status(400).json({"error":e.sqlMessage})
    }
 })

 router.get("/:name",async(req,res)=>{
    
    try{
     const sql=`select * from category where categoryName = "${req.params.name}"`
 
 
     
    const data= await sqlqueryhandler(sql)
    
 
   return data ? res.status(200).json({"message":data[0]}):res.status(500).json({"error":"something went wrong"});
    }
    catch(e){
     return res.status(400).json({"error":e.sqlMessage})
    }
 })


module.exports=router;