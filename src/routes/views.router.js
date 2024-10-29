import { Router } from "express";
import ProductModel from "../dao/models/product.model.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";

const viewsRouter = Router();

// Ruta para mostrar la lista de productos con paginación en /products
viewsRouter.get("/products", passport.authenticate("current", { session: false }), soloUser, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    try {
        const productosLista = await ProductModel.paginate({}, { limit, page });
        const productosListaFinal = productosLista.docs.map(({ _id, ...rest }) => rest);

        res.render("home", {
            productos: productosListaFinal,
            hasPrevPage: productosLista.hasPrevPage,
            hasNextPage: productosLista.hasNextPage,
            prevPage: productosLista.prevPage,
            nextPage: productosLista.nextPage,
            currentPage: productosLista.page,
            totalPages: productosLista.totalPages
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al cargar los productos");
    }
});

// Ruta para vista en tiempo real de productos en /realtimeproducts solo accesible por administradores
viewsRouter.get("/realtimeproducts", passport.authenticate("current", { session: false }), soloAdmin, (req, res) => {
    res.render("realtimeproducts");
});

export { viewsRouter };
