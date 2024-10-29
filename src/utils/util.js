import bcrypt from "bcrypt";
import ProductModel from "../dao/models/product.model.js";
import { v4 as uuidv4 } from 'uuid';

const generarId = async () => {
    const id = uuidv4();
    console.log("ID generado:", id); // Log para verificar que se genera correctamente
    return id;
};

// Encriptado de PASSWORD
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

// Calcular total de compra
const calcularTotal = async (products) => {
    let total = 0;

    try {
        // Obtener los detalles completos de los productos en paralelo
        const productPromises = products.map(item => ProductModel.findById(item.product));
        const productosCompletos = await Promise.all(productPromises);

        // Calcular el total
        productosCompletos.forEach((productoCompleto, index) => {
            if (productoCompleto) {
                total += productoCompleto.price * products[index].quantity;
            } else {
                console.warn(`Producto no encontrado para ID: ${products[index].product}`);
            }
        });
    } catch (error) {
        console.error("Error al calcular el total", error);
        throw new Error("Error al calcular el total");
    }
    
    return total;
}

const eliminarProductosNoDisponibles = (cart, productosNoDisponibles) => {
    return cart.products.filter(item => 
        !productosNoDisponibles.some(producto => producto.toString() === item.product.toString())
    );
}

export { createHash, isValidPassword, generarId, calcularTotal, eliminarProductosNoDisponibles };