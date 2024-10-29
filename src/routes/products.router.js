import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productsRouter = Router();
const productController = new ProductController();

// Lista de todos los productos en la ruta /products
productsRouter.get("/", productController.getProducts);

// Traer producto por ID
productsRouter.get("/:pid", productController.getProductById);

// Crear producto
productsRouter.post("/", productController.addProduct);

// Método para actualizar un producto en la lista
productsRouter.put("/:pid", productController.updateProduct);

// Método Delete para eliminar productos
productsRouter.delete("/:pid", productController.deleteProduct);

export { productsRouter };
