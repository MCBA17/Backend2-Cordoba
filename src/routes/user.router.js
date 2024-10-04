import {Router} from "express";
import UsuarioModel from "../dao/models/users.model.js";
import CartModel from "../dao/models/cart.model.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import {createHash, isValidPassword} from "../utils/bcrypt.js"

const userRouter = Router();

// Registrarse
userRouter.post("/register", async (req, res)=>{
    let {usuario, password, first_name, last_name, age, email} = req.body;
   
    try{
        const existeUsuario = await UsuarioModel.findOne({usuario})
        
        if(existeUsuario){
            return res.status(400).send("Usuario Existente")
        }

        const nuevoCarrito = new CartModel();
        await nuevoCarrito.save

        const nuevoUsuario = new UsuarioModel({
            usuario,
            first_name,
            last_name,
            age,
            email,
            cart: nuevoCarrito._id,
            password: createHash(password)
            
        });
       
        await nuevoUsuario.save();

        const token = jwt.sign({usuario: nuevoUsuario.usuario, first_name: nuevoUsuario.first_name, last_name: nuevoUsuario.last_name, age: nuevoUsuario.age, email: nuevoUsuario.email}, "coderhouse", {expiresIn: "1h"})

        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch(error){
            res.status(500).send("Error del servidor al Registrar")
            console.log(error)
    }
})

// Iniciar Sesion
userRouter.post("/login", async(req, res)=>{
    let {usuario,password} = req.body;

    try{
        const usuarioEncontrado = await UsuarioModel.findOne({usuario});
        if(!usuarioEncontrado){
            return res.status(401).send("Usuario No Identificado")
        }

        if(!isValidPassword(password, usuarioEncontrado)){
            return res.status(401).send("Usuario No Identificado")
        }

        const token = jwt.sign({usuario: usuarioEncontrado.usuario, first_name: usuarioEncontrado.first_name, last_name: usuarioEncontrado.last_name, age: usuarioEncontrado.age, email: usuarioEncontrado.email}, "coderhouse", {expiresIn: "1h"})

        res.cookie("coderCookieToken", token, {maxAge: 3600000, httpOnly: true})

        res.redirect("/api/sessions/current")

    }catch (error){
        res.status(500).send("Error del servidor")
    }

})

userRouter.get("/current", passport.authenticate("current", {session: false}), (req,res)=>{
    res.render("homeusers", {usuario: req.user.usuario})
})

// Cerrar Sesion
userRouter.post("/logout", (req,res)=>{
    res.clearCookie("coderCookieToken")
    res.redirect("/login")
})

export {userRouter};