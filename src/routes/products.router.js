import {Router} from "express";
import {productManager} from "../app.js";

const productsRouter = Router();

// Todos los productos con paginación
productsRouter.get("/", async (req, res) => {
    try{    
        const result = await productManager.getProducts(req.query);
        res.send({ 
            result: "success", 
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : null,
            nextLink: result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : null,
            isValid: result.docs.length > 0
        });
        console.log(result)       
    }catch (error){
        res.send("Error en consultar los productos")
        console.log(error);
        }
    }
)

// Producto por su ID
productsRouter.get("/:pid", async (req, res) =>{
    let pid = req.params.pid;
    try{
        const response = await productManager.getProductById(pid);

        if(!response){
            res.send("Producto No Encontrado por ID");
        }else{
            res.json(response);
        }
    } catch(error){
        console.log("Error en la busqueda por Id",error);
    }

})

// Crear Producto
productsRouter.post("/", async (req, res) => {
    try{
        const {title, description, price, thumbnails, code, stock, status, category} = req.body;
        const newProd= req.body;
        const response = await productManager.addProduct(newProd)
        res.json(response)
    }catch (error){
        res.send("Error al crear producto")
        console.log(error);
        }
    }
)

// Actualizar Producto
productsRouter.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try{
        const {title, description, price, thumbnail, code, stock, status=true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    }catch(error){
        res.send("Error al actualizar producto")
        console.log(error);

    }
  });

// Borrar un Producto
productsRouter.delete('/:pid', async (req, res) => {
    let pid = req.params.pid;
    try{
        await productManager.deleteProduct(pid);
        res.send("Producto Eliminado")
    }catch(error){
        res.send("Error al eliminar producto")
        console.log(error);
    }
  
  }
);

export {productsRouter};