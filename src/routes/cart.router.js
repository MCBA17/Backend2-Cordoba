import { Router } from "express";
import { CartManager } from "../cartManager.js";

const CartRouter = Router();
const cartManager = new CartManager();

// Obtener todos los carritos (http://localhost:8080/cart)
CartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error al obtener los carritos.");
    }
});

// Obtener productos de un carrito por ID (http://localhost:8080/cart/:cid/products)
CartRouter.get("/:cid/products", async (req, res) => {
    const { cid } = req.params;
    try {
        const products = await cartManager.getCartProducts(cid);
        if (products.length) {
            res.json(products);
        } else {
            res.status(404).send("Carrito no encontrado o sin productos.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error al obtener los productos del carrito.");
    }
});

// Crear un nuevo carrito (http://localhost:8080/cart)
CartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.newCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error al crear el carrito.");
    }
});

// Agregar un producto al carrito (http://localhost:8080/cart/:cid/products/:pid)
CartRouter.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.cartAddProduct(cid, pid);
        res.status(201).send("Producto agregado al carrito.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error al agregar el producto al carrito.");
    }
});

export { CartRouter };
