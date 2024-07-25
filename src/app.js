import express from "express";
import { ProductsRouter } from "./routes/products.router.js";
import { CartRouter } from "./routes/cart.router.js";

// App
const app = express();
const PORT = 8080;

// JSON
app.use(express.json())

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para renderizar el archivo HTML
app.get("/", (req, res) => {
    res.sendFile('index.html', { root: 'src/public' });
});

app.listen(PORT, () => {
    console.log("Escuchando en el puerto " + PORT);
});

// Rutas
app.use("/products", ProductsRouter)
app.use("/cart", CartRouter)
