import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Mtsaia:coder@cluster0.pj8s0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a MongoDB"))
    .catch( (error) => console.log(error))