import express from "express";
import dotenv from "dotenv";
import { connectDB } from  './config/db.js'

import productRoutes from './routes/product.route.js'

import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['1.1.1.1', '9.9.9.9']);

dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // para que o express consiga entender o body da requisição

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});