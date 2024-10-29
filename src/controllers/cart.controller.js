import cartService from "../services/cart.service.js";
import productService from "../services/product.service.js";
import UsuarioModel from "../dao/models/users.model.js";
import TicketModel from "../dao/models/ticket.model.js";
import { generarId, calcularTotal } from "../utils/util.js";

class CartController {
    
    async addCart(req, res) {
        try {
            const response = await cartService.addCart();
            res.json(response);
        } catch (error) {
            res.send("Error al crear el Carrito");
            console.log(error);
        }
    }

    async getCartById(req, res) {
        const cid = req.params.cid;
        try {
            const cart = await cartService.getCartById(cid);
            res.json(cart.products);
        } catch (error) {
            res.send("Error al obtener el Carrito");
        }
    }

    async addProductsToCart(req, res) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;

        try {
            const actualizado = await cartService.addProductsToCart(cid, pid, quantity);
            res.json(actualizado.products);
        } catch (error) {
            res.send("Error al actualizar");
            console.log(error);
        }
    }

    async deleteProductFromCart(req, res) {
        const { cid, pid } = req.params;

        try {
            const actualizado = await cartService.deleteProductFromCart(cid, pid);
            res.json(actualizado.products);
        } catch (error) {
            res.send("Error al actualizar");
            console.log(error);
        }
    }

    async finalizarCompra(req, res) {
        const cid = req.params.cid;
        
        try {
            const cart = await cartService.getCartById(cid);
    
            // Validar que el carrito no esté vacío
            if (!cart.products || cart.products.length === 0) {
                return res.status(400).send({ error: "El carrito está vacío." });
            }
    
            const productosNoDisponibles = [];
            for (const item of cart.products) {
                const pid = item.product.toHexString();
                const product = await productService.getProductById(pid);
    
                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity;
                    await product.save();
                } else {
                    productosNoDisponibles.push(pid);
                }
            }
    
            const userWithCart = await UsuarioModel.findOne({ cart: cid });
            const purchaserEmail = userWithCart ? userWithCart.email : null;
    
            if (!purchaserEmail) {
                return res.status(400).send({ error: "El comprador debe tener un correo electrónico válido." });
            }
    
            const ticketCode = await generarId();
            
            const ticket = new TicketModel({
                code: ticketCode,
                purchase_datetime: new Date(),
                amount: await calcularTotal(cart.products),
                purchaser: purchaserEmail
            });
    
            await ticket.save();
    
            res.send({
                cliente: userWithCart ? userWithCart.first_name : null,
                email: purchaserEmail,
                numTicket: ticket.code,
                noDisponible: productosNoDisponibles
            });
    
        } catch (error) {
            res.status(500).send({ error: "Error al generar ID", details: error.message });
        }
    }
}

export default CartController;