import { Router } from "express";
import { ProductManager } from "../productManager.js";

const ProductsRouter = Router();
const productManager = new ProductManager();

// Pedir todos los productos o un limite específico (http://localhost:8080/productos), (http://localhost:8080/products?limit=number)
ProductsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, Number(limit));
            return res.json(limitedProducts);
        } else {
            return res.json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});

// Pedir un producto por ID (http://localhost:8080/productos/:pid)
ProductsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productManager.getProductByID(pid);

        if (product) {
            return res.json(product);
        } else {
            return res.status(404).send("Producto no encontrado.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});

// Añadir un producto (http://localhost:8080/productos)
ProductsRouter.post("/", async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error.");
    }
});

// Actualizar las caracteristicas de un producto existente (http://localhost:8080/productos/:pid)
ProductsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const updatedProduct = await productManager.updateProduct(pid, req.body);
        if (updatedProduct) {
            return res.json(updatedProduct);
        } else {
            return res.status(404).send("Producto no encontrado.");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Ha ocurrido un error.");
    }
});

// Eliminar un producto (http://localhost:8080/productos/:pid)
ProductsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const deleted = await productManager.deleteProduct(pid);
        if (deleted) {
            return res.status(204).send();
        } else {
            return res.status(404).send("Producto no encontrado.");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Ha ocurrido un error.");
    }
});

export { ProductsRouter, productManager };