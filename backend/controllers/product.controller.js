import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProducts = async (req, res) => {
    const product = req.body; // o usuário vai enviar esses dados

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Por favor, preencha todos os campos obrigatórios" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const deletedProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Excluído com sucesso", data: deletedProduct });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};