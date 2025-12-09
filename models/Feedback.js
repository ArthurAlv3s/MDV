import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['bug', 'elogio', 'outros'], required: true },
    titulo: { type: String, required: true },
    mensagem: { type: String, required: true },
    avaliacao: { type: Number, min: 1, max: 5, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
