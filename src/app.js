import express from "express";
import { ProductsRouter } from "./routes/products.router.js";
import { CartRouter } from "./routes/cart.router.js";
import { ViewsRouter } from "./routes/views.router.js";
import { productManager } from "./routes/products.router.js";
import { engine } from "express-handlebars";

import { Server } from "socket.io"

// App
const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"))

// Ruta para renderizar el archivo HTML
app.get("/", (req, res) => {
    res.sendFile('index.html', { root: 'src/public' });
});

const Servidor = app.listen(PORT, () => {
    console.log("Escuchando en el puerto " + PORT);
});

// Rutas
app.use("/products", ProductsRouter)
app.use("/cart", CartRouter)
app.use("/", ViewsRouter);

//Express Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

// Socket
const io = new Server(Servidor);

io.on("connection", async (socket) =>{
    socket.on('message', (data) => {
      console.log(`Nuevo cliente ${data}`)
  });
    socket.emit("products", await productManager.getProducts());
  
    socket.on("deleteProduct", async (productId) => {
      console.log("Id recibido", productId);
      productManager.deleteProduct(productId);
      socket.emit("products", await productManager.getProducts());
      console.log("Productos actualizados");
  });
  
    socket.on("productForm" , async (data) => {
      const { title, description, price, thumbnail, code, stock, category } = data;
      await productManager.addProduct({ title, description, price, thumbnail, code, stock, category });
      socket.emit("products", await productManager.getProducts());
      console.log("Productos actualizados");
    });
    
  })
  