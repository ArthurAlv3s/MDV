import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    fotoPerfil: { type: String }, // URL da foto
    historicoVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

const User = mongoose.model('User', userSchema);

export default User;
