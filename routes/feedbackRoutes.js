import express from 'express';
import { criarFeedback, listarFeedbacks } from '../controllers/FeedbackController.js';

const router = express.Router();

// GET para listar feedbacks
router.get('/', listarFeedbacks);

// POST para criar feedback
router.post('/', criarFeedback);

export default router;
