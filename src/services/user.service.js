import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/util.js";
import CartModel from "../dao/models/cart.model.js";

class UserService {

    // Registrar un nuevo usuario y crear un carrito para él
    async registerUser(userData) {
        try {
            const existingUser = await userRepository.getUserByEmail(userData.email);

            if (existingUser) {
                throw new Error("El usuario ya existe");
            }

            // Crear y guardar un nuevo carrito
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            
            // Asignar el ID del carrito al nuevo usuario
            userData.cart = nuevoCarrito._id;
            userData.password = createHash(userData.password);

            return await userRepository.createUser(userData);
        } catch (error) {
            console.error("Error en registerUser:", error.message);
            throw new Error("Error al registrar el usuario");
        }
    }

    // Iniciar sesión de usuario validando credenciales
    async loginUser(email, password) {
        try {
            const user = await userRepository.getUserByEmail(email);

            if (!user || !isValidPassword(password, user)) {
                throw new Error("Credenciales no válidas");
            }

            return user;
        } catch (error) {
            console.error("Error en loginUser:", error.message);
            throw new Error("Error al iniciar sesión");
        }
    }

    // Obtener usuario por ID
    async getUserById(id) {
        try {
            return await userRepository.getUserById(id);
        } catch (error) {
            console.error("Error en getUserById:", error.message);
            throw new Error("Error al obtener usuario por ID");
        }
    }

    // Actualizar datos de usuario
    async updateUser(id, userData) {
        try {
            return await userRepository.updateUser(id, userData);
        } catch (error) {
            console.error("Error en updateUser:", error.message);
            throw new Error("Error al actualizar usuario");
        }
    }

    // Eliminar usuario por ID
    async deleteUser(id) {
        try {
            return await userRepository.deleteUser(id);
        } catch (error) {
            console.error("Error en deleteUser:", error.message);
            throw new Error("Error al eliminar usuario");
        }
    }
}

export default new UserService();
