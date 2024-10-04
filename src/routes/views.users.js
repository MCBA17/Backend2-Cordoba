import {Router} from "express";

const viewUserRouter = Router();

viewUserRouter.get("/login", (req,res)=>{
    res.render("login")
})

viewUserRouter.get("/register", (req,res)=>{
    res.render("register")
})

export {viewUserRouter};