import { Router } from "express";
import { ProductManager } from "../productManager.js";

const ViewsRouter = Router();

//Lista de todos los productos en la ruta /products
ViewsRouter.get("/products", async (req, res) => {
        const productos = await ProductManager.getProducts();
        res.render("home", {productos});
    }
)

ViewsRouter.get("/realtimeproducts", async (req, res) => { 
        res.render("realtimeproducts");    
    }
)

export {ViewsRouter};
