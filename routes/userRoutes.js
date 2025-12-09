import express from 'express';
import { editarUsuario } from '../controllers/userController.js';
import upload from "../middleware/upload.js";


const router = express.Router();

router.put('/:id', upload.single('fotoPerfil'), editarUsuario);

export default router;
