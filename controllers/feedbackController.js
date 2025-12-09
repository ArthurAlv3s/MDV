import Feedback from '../models/Feedback.js';

export const criarFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({ success: true, feedback });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const listarFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ criadoEm: -1 });
        res.json({ success: true, feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
