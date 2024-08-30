import CartModel from "../models/cart.model.js";

class CartManager {
    // Crear Carrito
    addCart = async () => {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear un Cart", error);
            throw error;
        }
    };

    // Carrito por ID
    getCartById = async (cid) => {
        try {
            const cartFound = await CartModel.findById(cid);
            if (!cartFound) {
                console.log("Carrito No Encontrado");
                return null;
            } else {
                return cartFound;
            }
        } catch (error) {
            console.log("Error al cargar los carritos", error);
            throw error;
        }
    };

    // Agregar productos al carrito
    addProductsToCart = async (cid, pid, quantity = 1) => {
        try {
            const cart = await this.getCartById(cid);
            const existProduct = cart.products.find(
                (element) => element.product.toString() === pid
            );
            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Error al agregar productos al cart", error);
            throw error;
        }
    };

    // Eliminar producto del carrito
    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                console.log("No se encontró el carrito");
                return null;
            }

            const updatedProducts = cart.products.filter(
                (item) => item.product.toString() !== productId.toString()
            );

            if (updatedProducts.length === cart.products.length) {
                console.log("No se encontró el producto en el carrito");
                return null;
            }

            cart.products = updatedProducts;
            await cart.save();

            return cart;
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
            return null;
        }
    };

    // Actualizar carrito
    updateCartProducts = async (cartId, products) => {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                console.log("Carrito no encontrado");
                return null;
            }

            cart.products = products.map(product => ({
                product: product.product,
                quantity: product.quantity
            }));
            cart.markModified("products");
            await cart.save();

            return cart;
        } catch (error) {
            console.log("Error al actualizar el carrito", error);
            throw error;
        }
    };

    // Actualizar la cantidad de un producto en el carrito
    updateProductQuantityInCart = async (cid, pid, quantity) => {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                console.log("No se encontró el carrito");
                return null;
            }
    
            const product = cart.products.find(
                (item) => item.product.toString() === pid
            );
    
            if (!product) {
                console.log("No se encontró el producto en el carrito");
                return null;
            }
    
            product.quantity = quantity;
            cart.markModified("products");
            await cart.save();
    
            return cart;
        } catch (error) {
            console.log("Error al actualizar la cantidad del producto", error);
            throw error;
        }
    };    
}

export { CartManager };