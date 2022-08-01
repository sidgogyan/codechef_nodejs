const router=require("express").Router()
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
var dir = './tmp';
const exec = require('child_process').exec;  
const spawn = require('child_process').spawn; 
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



const runcode=(dir,input,req,res)=>{
  const filepath="Solution"
  const inputpath="input.txt"
   const command=input?` cd ${dir} &&  javac ${filepath}.java && java ${filepath} < ${inputpath}`:` cd ${dir} && javac ${filepath} && java ${filepath}`
     exec(command,{timeout:5000},(err, stdout, stderr) => {  
        if (err) {  
          
         console.log(err)
          res.json({val:"err"});  
        }
        else if(stdout){
          res.json ({val:stdout})
        }
        else{
          res.json ({val:stderr})
        }
       
      
      
      fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    
       
    });

      });  

    
}



router.post("/",(req,res)=>{

  try{
    const {usercode,input}=req.body;
   
    dir=uuidv4();

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }





    fs.writeFile(`${dir}/Solution.java`, usercode, async function (err) {
        if (err) throw err;
        if(input){
          fs.writeFile(`${dir}/input.txt`,input,async function(err1){
            if(err1) throw err1;

            await runcode(dir,true,req,res)
          })
        }
        else{
          await runcode(dir,false,req,res)
        }
         
        
      });
    }
    catch(e){
      res.status(500).json({"error":e})
    }

   
})



const judge_code=((dir,req,res)=>{
  
  const filepath=`Main`
  const inputpath=`input.txt`
  const command=`cd ${dir} && javac ${filepath}.java && java ${filepath} < ${inputpath}`
  exec(command,(err, stdout, stderr) => {  
     if (err) {  

       res.json({message:"Error in Your Code",status:"0"});  
     }
     else if(stdout){
      if(stdout.includes('0')){
        res.json({message:`wrong answer in ${stdout.indexOf('0')} testcase`,status:"0"});  
       
      }
      else{
        res.json({message:"Accepted",status:"1"});  
      }
      
     }
     else{
      res.json({message:stderr,status:"0"});  
       
     }
    
   
   
   fs.rmdir(dir, { recursive: true }, (err) => {
     if (err) {
         throw err;
     }
 
     console.log(`${dir} is deleted!`);
 });

   });

})


router.post("/judge",async(req,res)=>{

  try{
    const {problemID,usercode}=req.body;

    const sql=`select java_code,input_file,java_code_runner from problems where problemID = "${problemID}"`
 
 
     
    const data= await sqlqueryhandler(sql)
    const {java_code,input_file,java_code_runner}=data[0]


   
    dir=uuidv4();

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    let promise1=new Promise(function(resolve,reject){
      fs.writeFile(`${dir}/Solution.java`, usercode, function (err) {
        if(err) {
          reject(err)
        }
        else{
          resolve("promise passed")
        }
      })
    })
    let promise2=new Promise((resolve,reject)=>{
      fs.writeFile(`${dir}/Main.java`, java_code_runner, async function (err) {
        if(err) {
          reject(err)
        }
        else{
          resolve("promise passed")
        }
      })
    })
    let promise3=new Promise((resolve,reject)=>{
      fs.writeFile(`${dir}/Tester.java`, java_code, async function (err) {
        if(err) {
          reject(err)
        }
        else{
          resolve("promise passed")
        }
      })
    })

    let promise4=new Promise((resolve,reject)=>{
      fs.writeFile(`${dir}/input.txt`, input_file, async function (err) {
        if(err) {
          reject(err)
        }
        else{
          resolve("promise passed")
        }
      })
    })

    try{
    await Promise.all([promise1,promise2,promise3,promise4])

    judge_code(dir,req,res)
    }
    catch(e){
      res.status(500).json({"error":e})
    }

    
    }
    catch(e){
      res.status(500).json({"error":e})
    }

   
})



module.exports=router;