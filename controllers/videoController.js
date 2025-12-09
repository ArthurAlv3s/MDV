import Video from '../models/Video.js';
import User from '../models/User.js';

export const salvarVideoHistorico = async (req, res) => {
    try {
        const { videoId } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.json({ success: false });

        // Remove se já existir (evita duplicação)
        user.historicoVideos = user.historicoVideos.filter(id => id.toString() !== videoId);

        // Adiciona no começo da lista
        user.historicoVideos.unshift(videoId);

        // Limite opcional (máx 30 vídeos)
        if (user.historicoVideos.length > 30) {
            user.historicoVideos.pop();
        }

        await user.save();

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};


// controllers/videoController.js

export const avaliarVideo = async (req, res) => {
    const { videoId } = req.body;
    const userId = req.user.id;

    try {
        const video = await Video.findById(videoId);

        if (!video)
            return res.status(404).json({ message: "Vídeo não encontrado" });

        // Já curtiu?
        if (video.gostaram.includes(userId)) {
            return res.status(400).json({ message: "Você já curtiu este vídeo" });
        }

        video.gostaram.push(userId);
        video.qtdAvaliacoes = video.gostaram.length;

        await video.save();

        res.json({ message: "Curtido com sucesso!", qtdAvaliacoes: video.qtdAvaliacoes });

    } catch (err) {
        res.status(500).json({ message: "Erro ao avaliar vídeo" });
    }
};



export const criarVideo = async (req, res) => {
    try {
        const { titulo, link } = req.body;

        const video = await Video.create({ titulo, link });

        res.status(201).json({ success: true, video });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
// no topo já tem: import Video from '../models/Video.js';
export const listarVideos = async (req, res) => {
    try {
        const videos = await Video.find({}, {
            gostaram: 0,
            __v: 0
        }).sort({ qtdAvaliacoes: -1 });  // Ordena por mais curtidos
        
        res.json(videos);  // Remove o {success: true, videos} para ficar apenas videos
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar vídeos' });
    }
};
// Buscar vídeos curtidos pelo usuário
export const listarVideosCurtidos = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const videos = await Video.find(
            { gostaram: userId },
            { __v: 0 }
        ).sort({ _id: -1 });
        
        res.json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar vídeos curtidos' });
    }
};

// Verificar se usuário já curtiu o vídeo
export const verificarCurtida = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;
        
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ jaCurtiu: false });
        }
        
        const jaCurtiu = video.gostaram.includes(userId);
        res.json({ jaCurtiu });
    } catch (error) {
        res.status(500).json({ jaCurtiu: false });
    }
};


// Adicione esta função no videoController.js

export const descurtirVideo = async (req, res) => {
    const { videoId } = req.body;
    const userId = req.user.id;

    try {
        const video = await Video.findById(videoId);
        if (!video)
            return res.status(404).json({ message: "Vídeo não encontrado" });

        // Verifica se realmente curtiu antes
        if (!video.gostaram.includes(userId)) {
            return res.status(400).json({ message: "Você não curtiu este vídeo ainda" });
        }

        // Remove a curtida
        video.gostaram = video.gostaram.filter(id => id.toString() !== userId.toString());
        video.qtdAvaliacoes = video.gostaram.length;
        
        await video.save();

        res.json({ message: "Curtida removida com sucesso!", qtdAvaliacoes: video.qtdAvaliacoes });
    } catch (err) {
        res.status(500).json({ message: "Erro ao descurtir vídeo" });
    }
};
// Buscar histórico do usuário
export const buscarHistorico = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId).populate('historicoVideos');
        
        if (!user) {
            return res.json({ success: false, videos: [] });
        }
        
        // Retorna os vídeos na ordem do histórico (mais recente primeiro)
        res.json({ success: true, videos: user.historicoVideos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, videos: [] });
    }
};

// Limpar todo o histórico
export const limparHistorico = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false });
        }
        
        user.historicoVideos = [];
        await user.save();
        
        res.json({ success: true, message: "Histórico limpo com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

// Remover vídeo específico do histórico
export const removerVideoHistorico = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false });
        }
        
        user.historicoVideos = user.historicoVideos.filter(
            id => id.toString() !== videoId
        );
        
        await user.save();
        
        res.json({ success: true, message: "Vídeo removido do histórico" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};