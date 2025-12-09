import express from 'express'
import { 
    salvarVideoHistorico, 
    criarVideo, 
    avaliarVideo, 
    listarVideos,
    listarVideosCurtidos,
    verificarCurtida,
    descurtirVideo,
    buscarHistorico,          // ← NOVO
    limparHistorico,          // ← NOVO
    removerVideoHistorico     // ← NOVO
} from '../controllers/videoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listarVideos);
router.get('/curtidos', authMiddleware, listarVideosCurtidos);
router.get('/verificar-curtida/:videoId', authMiddleware, verificarCurtida);
router.get('/historico', authMiddleware, buscarHistorico);  // ← NOVO

router.post('/criar', authMiddleware, criarVideo);
router.post('/historico', authMiddleware, salvarVideoHistorico);
router.post('/avaliar', authMiddleware, avaliarVideo);
router.post('/descurtir', authMiddleware, descurtirVideo);

router.delete('/historico/limpar', authMiddleware, limparHistorico);  // ← NOVO
router.delete('/historico/:videoId', authMiddleware, removerVideoHistorico);  // ← NOVO

export default router;