import productRepository from "../repositories/product.repository.js";

class ProductService {

    // Agregar un nuevo producto
    async addProduct(productData) {
        try {
            return await productRepository.createProduct(productData);
        } catch (error) {
            console.error("Error al agregar el producto", error);
            throw new Error("Error al agregar el producto");
        }
    }

    // Obtener productos con paginación y filtros opcionales
    async getProducts(queryParams) {
        let query = {};
        let sort = {};
        const page = parseInt(queryParams.page) || 1;
        const limit = parseInt(queryParams.limit) || 10;
        const { category, sort: sortOrder, title } = queryParams;

        if (category) { 
            query.category = category; 
        }
    
        if (title) { 
            query.title = new RegExp(title, 'i'); 
        }
    
        if (sortOrder) { 
            sort.price = sortOrder === 'asc' ? 1 : -1; 
        }
    
        const options = {
            limit,
            sort,
            page,
            lean: true
        };

        try {
            const response = await productRepository.paginate(query, options);
            return response;
        } catch (error) {
            console.error("Error al obtener los productos", error);
            throw new Error("Error al obtener los productos");
        }
    }

    // Obtener producto por ID
    async getProductById(id) {
        try {
            const productFound = await productRepository.findById(id);
            if (productFound) {
                return productFound;
            } else {
                console.log("Producto no encontrado por ID");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el producto por ID", error);
            throw new Error("Error al obtener el producto por ID");
        }
    }

    // Actualizar un producto por ID
    async updateProduct(id, productData) {
        try {
            const updatedProduct = await productRepository.findByIdAndUpdate(id, productData, { new: true });
            if (!updatedProduct) {
                console.log("Producto no encontrado para actualizar");
                return null;
            } else {
                return updatedProduct;
            }
        } catch (error) {
            console.error("Error al actualizar el producto", error);
            throw new Error("Error al actualizar el producto");
        }
    }

    // Eliminar un producto por ID
    async deleteProduct(id) {
        try {
            const deletedProduct = await productRepository.findByIdAndDelete(id);
            if (!deletedProduct) {
                console.log("Producto no encontrado para eliminar");
                return null;
            } else {
                return deletedProduct;
            }
        } catch (error) {
            console.error("Error al eliminar el producto", error);
            throw new Error("Error al eliminar el producto");
        }
    }
}

export default new ProductService();
