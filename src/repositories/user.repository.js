import userDao from "../dao/user.dao.js";

class UserRepository {
    async createUser(userData) {
        try {
            return await userDao.save(userData);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw new Error("No se pudo crear el usuario");
        }
    }

    async getUserById(id) {
        try {
            return await userDao.findById(id);
        } catch (error) {
            console.error("Error al obtener el usuario por ID:", error);
            throw new Error("Usuario no encontrado");
        }
    }

    async getUserByEmail(email) {
        try {
            return await userDao.findOne({ email });
        } catch (error) {
            console.error("Error al obtener el usuario por email:", error);
            throw new Error("No se pudo obtener el usuario por email");
        }
    }

    async getUserByUsername(username) {
        try {
            return await userDao.findOne({ username });
        } catch (error) {
            console.error("Error al obtener el usuario por nombre de usuario:", error);
            throw new Error("No se pudo obtener el usuario por nombre de usuario");
        }
    }

    async updateUser(id, userData) {
        try {
            return await userDao.update(id, userData);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw new Error("No se pudo actualizar el usuario");
        }
    }

    async deleteUser(id) {
        try {
            return await userDao.delete(id);
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            throw new Error("No se pudo eliminar el usuario");
        }
    }
}

export default new UserRepository();
