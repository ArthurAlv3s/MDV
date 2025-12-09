import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    link: { type: String, required: true },
    avaliacao: { type: Number, default: 0 },
    qtdAvaliacoes: { type: Number, default: 0 },
    gostaram: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

});

const Video = mongoose.model('Video', videoSchema);

export default Video;
