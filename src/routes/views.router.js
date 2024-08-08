import { Router } from "express";
import { productManager } from "./products.router.js";

const ViewsRouter = Router();

//Lista de todos los productos en la ruta /products
ViewsRouter.get("/products", async (req, res) => {
        const productos = await productManager.getProducts();
        res.render("home", {productos});
    }
)

ViewsRouter.get("/realtimeproducts", async (req, res) => { 
        res.render("realtimeproducts");    
    }
)

export {ViewsRouter};
