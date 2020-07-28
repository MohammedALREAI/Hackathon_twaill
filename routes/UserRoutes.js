import UserController from "../controllers/UserController";

const express = require("express");
const userRouter = express.Router();

// for register
userRouter.post("/register", UserController.register);




export default userRouter;
