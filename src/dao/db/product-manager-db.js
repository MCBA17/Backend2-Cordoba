import ProductModel from "../models/product.model.js";

class ProductManager {
    
    // Agregar un Producto
    addProduct = async ({title, description, price, thumbnails, code, stock, status, category}) => {
        try{
            const newProduct = new ProductModel({title, description, price, thumbnails, code, stock, status, category})
            await newProduct.save();
            return newProduct;
        }catch(error){
            console.log("Error al agregar un producto", error);
            return null
        }
    }

    // Retornar Productos
    getProducts = async (queryParams) => {
        let query = {};
        let sort = {};
        let page = parseInt(queryParams.page) || 1;
        let limit = parseInt(queryParams.limit) || 10;
        const { category, sort: sortOrder, title } = queryParams;
    
        if (category) {
            query.category = category;
        }
    
        if (title) {
            query.title = new RegExp(title, 'i'); // 'i' para que sea case-insensitive
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
            const response = await ProductModel.paginate(query, options);
            return response;
        } catch (error) {
            console.log("Error al obtener los productos", error);
            return null;
        }
    }
    
    // Producto por ID
    getProductById = async(id)=>{
        try{
            const productFound= await ProductModel.findById(id);
            if(productFound){
                return productFound
            }else{
                console.log("Producto No Encontrado por Id");
            }
        }catch(error){
            console.log("Error al obtener el Productos por id", error);
            return null
        }
    }

    // Actualizar un Producto
    updateProduct = async(id, {...data}) =>{
        
        try{
            const updateProd = await ProductModel.findByIdAndUpdate(id, {...data})
            if(!updateProd){
                console.log("No se encontro el producto");
                return null;
            } else {
                return updateProd
            }
        }catch(error){
            console.log("Error al actualizar Producto", error);
            return null
        } 
    }   

    // Borrar un Producto
    deleteProduct = async (id) => {
        try{
            const deleteProd = await ProductModel.findByIdAndDelete(id)
            if(!deleteProd){
                console.log("No se encontro el producto");
                return null;
            } else {
                return deleteProd
            }
        }catch(error){
            console.log("Error al actualizar Producto", error);
            return null
        } 
     }
}

export {ProductManager}