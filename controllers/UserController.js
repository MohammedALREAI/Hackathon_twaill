import User from "../models/User";

const  userController={}

// i think if ther user is fine  or not
userController.register= (async(req,res,next)=>{
// body contins of  username password and phoneumber
const {username,password}=req.body;
// cehack if user found or not
await User.findOne({where:{username}},(user,err)=>{
     if(err){
          next(err)
     }
     if(user){
          res.status(400).json( {message:'user are created successful'})

     }
     if(!user){

      User.save({username,password},(user,err)=>{
          if(err){
               next(err)
          }
          res.status(201).json( user,{message:'user are created successful'})
     })
     }
})


})




export default userController;;
