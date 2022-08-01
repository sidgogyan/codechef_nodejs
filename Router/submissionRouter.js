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


const addsubmisson=async(userId,problemId,code,status,verdict)=>{
    try{
        const sql=`insert Into submisson where`
    
        
    
    
        
       const data= await sqlqueryhandler(sql)
       
    
      return data ? res.status(200).json({"message":data}):res.status(500).json({"error":"something went wrong"});
       }
       catch(e){
        return res.status(400).json({"error":e.sqlMessage})
       }

}



 

router.post("/",async(req,res)=>{
   const {userId,problemId}=req.body
   
   try{
    const sql=`select * from submisson where userId=${userId} and problemID=${problemId}`

    


    
   const data= await sqlqueryhandler(sql)
   

  return data ? res.status(200).json({"message":data}):res.status(500).json({"error":"something went wrong"});
   }
   catch(e){
    return res.status(400).json({"error":e.sqlMessage})
   }
})





module.exports=router;