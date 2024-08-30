import { Router } from "express";
import { CartManager } from "../dao/db/cart-manager-db.js";
const cartRouter = Router();
const cartManager = new CartManager();

// Crear Carrito
cartRouter.post("/", async (req, res) => {
    try {
        const response = await cartManager.addCart();
        res.json(response);
    } catch (error) {
        res.status(500).send("Error al crear carrito");
        console.log(error);
    }
});

// Listar los productos de un carrito
cartRouter.get("/:cid", async (req, res) => {
    let cid = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.json(cart.products);
    } catch (error) {
        res.status(500).send("Error al obtener productos del carrito");
        console.log(error);
    }
});

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body.quantity || 1;

    try {
        const actualizado = await cartManager.addProductsToCart(cid, pid, quantity);
        res.json(actualizado.products);
    } catch (error) {
        res.status(500).send("Error al agregar producto al carrito");
        console.log(error);
    }
});

// Actualizar carrito
cartRouter.put("/:cid", async (req, res) => {
    let cid = req.params.cid;
    let products = req.body.products; // Suponiendo que req.body.products es un array de productos

    try {
        if (!Array.isArray(products)) {
            return res.status(400).send('El cuerpo de la solicitud debe ser un arreglo de productos');
        }

        const actualizado = await cartManager.updateCartProducts(cid, products);
        if (!actualizado) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.json(actualizado.products);
    } catch (error) {
        res.status(500).send("Error al actualizar el carrito");
        console.log(error);
    }
});

// Actualizar cantidad de producto en carrito
cartRouter.put("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body.quantity;

    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).send('La cantidad debe ser un número positivo');
    }

    try {
        const actualizado = await cartManager.updateProductQuantityInCart(cid, pid, quantity);
        if (!actualizado) {
            return res.status(404).send('Carrito o producto no encontrado');
        }
        res.json(actualizado.products);
    } catch (error) {
        res.status(500).send("Error al actualizar la cantidad del producto");
        console.log(error);
    }
});

// Eliminar producto del carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    try {
        const actualizado = await cartManager.deleteProductFromCart(cid, pid);
        res.json(actualizado.products);
    } catch (error) {
        res.status(500).send("Error al eliminar producto del carrito");
        console.log(error);
    }
});

export { cartRouter };
