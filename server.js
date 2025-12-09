// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();

// Middleware para liberar CORS
app.use(
    cors({
        origin: "*", // permite qualquer origem (use apenas para testes)
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization"
    })
);

// Middleware para ler JSON
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado!'))
    .catch(err => console.error('Erro MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);         // Registro e login
app.use('/api/feedback', feedbackRoutes); // Feedback
app.use('/api/users', userRoutes);        // Usuários
app.use('/api/videos', videoRoutes);      // Vídeos
app.use('/uploads', express.static('uploads'));


// Rota inicial
app.get('/', (req, res) => {
    res.send('API rodando!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
