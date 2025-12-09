
import express from 'express'
const router = express.Router();
import { registrar, login } from "../controllers/authController.js";


router.post('/register', registrar);
router.post('/login', login);

export default router;
