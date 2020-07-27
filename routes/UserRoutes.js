import UserController from "../controllers/UserController";
import {Router} from 'express'
const userRouter=require('express').Router({mergeParams:true})(Router)
userRouter.route('api/user').get(userController)

// for register 
userRouter.post("register", UserController.register);



export default userRouter;
