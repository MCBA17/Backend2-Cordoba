import { Router } from "express";

const viewUserRouter = Router();

// Ruta para la vista de inicio de sesión
viewUserRouter.get("/login", (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.error("Error al renderizar la página de login:", error);
        res.status(500).send("Error al cargar la página de inicio de sesión");
    }
});

// Ruta para la vista de registro de usuario
viewUserRouter.get("/register", (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.error("Error al renderizar la página de registro:", error);
        res.status(500).send("Error al cargar la página de registro");
    }
});

export { viewUserRouter };
