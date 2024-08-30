import {Router} from "express";
import ProductModel from "../dao/models/product.model.js";
import CartModel from "../dao/models/cart.model.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
        
        let page = req.query.page || 1;
        let limit = 10;
        
        const productosLista = await ProductModel.paginate({}, {limit, page});
        const productosListaFinal = productosLista.docs.map(elemento =>{
            const {_id, ...rest} = elemento.toObject();
            return rest
        })
            
        res.render("home",{
            productos: productosListaFinal,
            hasPrevPage: productosLista.hasPrevPage,
            hasNextPage: productosLista.hasNextPage,
            prevPage: productosLista.prevPage,
            nextPage: productosLista.nextPage,
            currentPage: productosLista.page,
            totalPages:productosLista.totalPages
        })
    }
)

viewsRouter.get("/carts", async (req, res) => {
    try {
        const carts = await CartModel.find().populate("products.product");
        const cartList = carts.map(cart => ({
            cartId: cart._id,
            productsCount: cart.products.length,
        }));

        res.render("cartsList", {
            carts: cartList,
        });
    } catch (error) {
        res.status(500).send("Error al obtener la lista de carritos");
        console.log(error);
    }
});

viewsRouter.get('/carts/:cid', async (req, res) => {
    try {
      const cart = await CartModel.findById(req.params.cid).populate('products.product').lean();
  
      if (!cart) {
        return res.status(404).send('Carrito no encontrado');
      }

      res.render('cartDetails', { cartId: cart._id, products: cart.products });
    } catch (err) {
      res.status(500).send('Error al obtener el carrito');
    }
  });

viewsRouter.get("/realtimeproducts", async (req, res) => { 
        res.render("realtimeproducts");    
    }
)

export {viewsRouter};