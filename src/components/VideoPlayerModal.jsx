import React from "react";
import { FiX, FiCheck } from "react-icons/fi";

function getYouTubeEmbed(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const vid = u.searchParams.get("v");
      if (vid) return `https://www.youtube.com/embed/${vid}`;
      const parts = u.pathname.split("/");
      const maybe = parts[parts.length - 1];
      return `https://www.youtube.com/embed/${maybe}`;
    }
  } catch (e) {
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return "";
}

export default function VideoPlayerModal({ 
  video, 
  onClose, 
  onLike,
  onDislike,
  jaCurtiu = false 
}) {
  if (!video) return null;

  const embed = getYouTubeEmbed(video.link);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-blue-900 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <FiX size={24} />
          </button>
          
          <h2 className="text-2xl font-bold pr-12">{video.titulo}</h2>
          
          <div className="flex items-center gap-2 mt-2 text-sm">
            <FiCheck className="text-green-300" />
            <span>{video.qtdAvaliacoes || 0} curtidas</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
          {embed ? (
            <iframe
              title={video.titulo}
              src={`${embed}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-lg">Link de vídeo inválido</p>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-6 bg-gray-50 space-y-4">
          
          {/* Botão de Curtir/Descurtir */}
          <button
            onClick={() => jaCurtiu ? onDislike(video._id) : onLike(video._id)}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] ${
              jaCurtiu
                ? "bg-gray-200 text-gray-700 border-2 border-gray-300 hover:bg-gray-300"
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <FiCheck 
              className={`text-2xl ${jaCurtiu ? "" : "animate-pulse"}`}
            />
            {jaCurtiu ? "Descurtir vídeo" : "Curtir vídeo"}
          </button>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}