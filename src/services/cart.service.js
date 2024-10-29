import cartRepository from "../repositories/cart.repository.js";

class CartService {
    // Crear un nuevo carrito
    async addCart() {
        return await cartRepository.createCart({ products: [] });
    }

    // Obtener carrito por ID
    async getCartById(cid) {
        const cartFound = await cartRepository.getCartById(cid);
        if (!cartFound) {
            console.log("Carrito no encontrado");
            return null;
        }
        return cartFound;
    }

    // Agregar productos al carrito
    async addProductsToCart(cid, pid, quantity = 1) {
        const cart = await cartRepository.getCartById(cid);
        const existProduct = cart.products.find(element => element.product.toString() === pid);

        if (existProduct) {
            existProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }
        
        cart.markModified("products");
        await cartRepository.updateCart(cid, cart);
        return cart;
    }

    // Eliminar producto del carrito
    async deleteProductFromCart(cid, pid) {
        const cart = await cartRepository.getCartById(cid);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
        
        if (productIndex === -1) {
            throw new Error("Producto no encontrado en el carrito");
        }

        // Remover el producto
        cart.products.splice(productIndex, 1);

        // Eliminar el carrito si está vacío
        if (cart.products.length === 0) {
            await cartRepository.deleteCart(cid);
            return "Carrito eliminado porque está vacío";
        }

        cart.markModified("products");
        await cartRepository.updateCart(cid, cart);
        return cart;
    }
}

export default new CartService();
