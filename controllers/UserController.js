import User from "../models/User";

export default userController={}

// i think if ther user is fine  or not
userController.register=async(req,res,next)=>{
// body contins of  username password and phoneumber
const {username,password}=req.body;
// cehack if user found or not
await User.findOne({where:{username}},(user,err)=>{
     if(err){
          next(err)
     }
     if(user){
          res.status(400).json({error:{message :`this meail already used ${username}`})
          next(null,false,{error:{message :`this meail already used ${username}`}})
     }
     if(!user){

     await User.create({username,password},(user,err)=>{
          if(err){
               next(err)
          }
          res.status(201).json( user,{message:'user are created successful'})
     })
     }
})


}





