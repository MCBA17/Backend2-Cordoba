import productService from "../services/product.service.js";

class ProductController {
    
    async getProducts(req, res) {
        try {
            const result = await productService.getProducts(req.query);
            res.send({
                result: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : null,
                nextLink: result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : null,
                isValid: result.docs.length > 0
            });
            console.log(result);
        } catch (error) {
            res.send("Error en consultar los productos");
            console.log(error);
        }
    }

    async getProductById(req, res) {
        const pid = req.params.pid;
        try {
            const response = await productService.getProductById(pid);
            response ? res.json(response) : res.send("Producto No Encontrado por ID");
        } catch (error) {
            console.log("Error en la búsqueda por ID", error);
        }
    }

    async addProduct(req, res) {
        try {
            const newProduct = req.body;
            const response = await productService.addProduct(newProduct);
            res.json(response);
        } catch (error) {
            res.send("Error al crear producto");
            console.log(error);
        }
    }

    async updateProduct(req, res) {
        const pid = req.params.pid;
        try {
            const updatedData = req.body;
            const response = await productService.updateProduct(pid, updatedData);
            res.json(response);
        } catch (error) {
            res.send("Error al actualizar producto");
            console.log(error);
        }
    }

    async deleteProduct(req, res) {
        const pid = req.params.pid;
        try {
            await productService.deleteProduct(pid);
            res.send("Producto Eliminado");
        } catch (error) {
            res.send("Error al eliminar producto");
            console.log(error);
        }
    }
}

export default ProductController;