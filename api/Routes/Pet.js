import express from "express";
import { addPet, deletePet, getPetBySlug, getPets, updatePet } from "../Controllers/PetController.js";

const router = express.Router();

router.get('/', getPets);
router.get('/:slug', getPetBySlug);
router.post('/', addPet);
router.put('/:slug', updatePet);
router.delete('/:slug', deletePet);

export default router