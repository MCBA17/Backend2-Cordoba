import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

class CartManager {
    constructor() {
        this.path = "src/data/cart.json";
        this.carts = [];
    }

    // Obtener todos los carritos
    getCarts = async () => {
        try {
            const res = await fs.readFile(this.path, "utf-8");
            const resJSON = JSON.parse(res);
            return resJSON;
        } catch (error) {
            console.error("Error al leer los carritos:", error);
            return [];
        }
    }

    // Obtener productos de un carrito por ID
    getCartProducts = async (id) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === id);
            return cart ? cart.products : [];
        } catch (error) {
            console.error("Error al obtener productos del carrito:", error);
            return [];
        }
    }

    // Crear un nuevo carrito
    newCart = async () => {
        try {
            const id = uuidv4();
            const newCart = { id, products: [] };
            const carts = await this.getCarts();
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            console.error("Error al crear un nuevo carrito:", error);
        }
    }

    // Agregar un producto al carrito
    cartAddProduct = async (cart_id, product_id) => {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cart_id);

            if (cartIndex === -1) {
                console.log("El carrito no pudo ser encontrado.");
                return;
            }

            const cartProducts = carts[cartIndex].products;
            const productIndex = cartProducts.findIndex(product => product.product_id === product_id);

            if (productIndex !== -1) {
                cartProducts[productIndex].quantity += 1;
            } else {
                cartProducts.push({ product_id, quantity: 1 });
            }

            carts[cartIndex].products = cartProducts;
            await fs.writeFile(this.path, JSON.stringify(carts));
            console.log("El producto fue agregado al carrito.");
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    }
}

export {CartManager}