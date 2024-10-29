import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";
import CartModel from "../dao/models/cart.model.js";

class UserController {

    async register(req, res) {
        const { first_name, last_name, age, email, usuario, password } = req.body;

        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();

            const newUser = await userService.registerUser({
                first_name, last_name, age, email, usuario, password, cart: newCart.id
            });

            const token = jwt.sign(
                { usuario, first_name, last_name, age, email, rol: newUser.rol },
                "coderhouse",
                { expiresIn: "1h" }
            );

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });
            res.redirect("/api/sessions/current");

        } catch (error) {
            res.status(500).send({ error: "Usuario Existente" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await userService.loginUser(email, password);
            const token = jwt.sign(
                { usuario: user.usuario, name: user.first_name, lastName: user.last_name, email: user.email, rol: user.rol },
                "coderhouse",
                { expiresIn: "1h" }
            );

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });
            res.redirect("/api/sessions/current");

        } catch (error) {
            res.status(500).send({ error: "Error en el Login" });
        }
    }

    async current(req, res) {
        if (req.user) {
            const userDTO = new UserDTO(req.user);
            res.render("homeusers", { usuario: userDTO.usuario });
        } else {
            res.send("No Autorizado");
        }
    }

    async logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.redirect("/login");
    }

}

export default UserController;
