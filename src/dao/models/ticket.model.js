import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    code: { type: String, required: true }, // Asegúrate de que sea un campo requerido
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
});

const TicketModel = mongoose.model('Ticket', TicketSchema);

export default TicketModel;
