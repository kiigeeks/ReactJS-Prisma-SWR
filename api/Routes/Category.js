import express from "express";
import { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router