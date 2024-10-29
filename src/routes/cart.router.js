import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = Router();
const cartController = new CartController();

// Crear Carrito
cartRouter.post("/", cartController.addCart);

// Listar productos de un determinado carrito
cartRouter.get("/:cid", cartController.getCartById);

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", cartController.addProductsToCart);

// Eliminar producto del carrito
cartRouter.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

// Finalizar compra
cartRouter.post("/:cid/purchase", cartController.finalizarCompra);

export { cartRouter };
