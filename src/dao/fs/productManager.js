import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

// Product Manager (CRUD)
export class ProductManager {
    constructor() {
        this.path = "src/data/products.json";
        this.products = [];
    }

    // Agregar Productos
    addProduct = async ({ title, description, code, price, status, stock, category, thumbnails }) => {
        const id = uuidv4();

        let newProduct = { id, title, description, code, price, status, stock, category, thumbnails };

        this.products = await this.getProducts();
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products));

        return newProduct;
    }

    // Pedir Productos
    getProducts = async () => {
        try {
            const res = await fs.readFile(this.path, "utf-8");
            return JSON.parse(res);
        } catch (error) {
            return []; // Retorna un array vacío si hay un error (por ejemplo, si el archivo no existe aún)
        }
    }

    // Pedir un Producto por ID
    getProductByID = async (id) => {
        const products = await this.getProducts();

        const product = products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.log("No se ha encontrado un producto con ese ID.");
            return null;
        }
    }

    // Actualizar Producto
    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...data };
            await fs.writeFile(this.path, JSON.stringify(products));
        } else {
            console.log("No se ha encontrado un producto con ese ID.");
        }
    }

    // Borrar un Producto
    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
        } else {
            console.log("No se ha encontrado un producto con ese ID.");
        }
    }
}
