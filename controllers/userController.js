import User from '../models/User.js';

export const editarUsuario = async (req, res) => {
    try {
        const camposAtualizar = {};

        if (req.body.nome) camposAtualizar.nome = req.body.nome;

        if (req.file) {
            camposAtualizar.fotoPerfil = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            camposAtualizar,
            { new: true }
        );

        res.json({ success: true, user });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

