import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "./AuthContext.jsx";
import VideoPlayerModal from "./VideoPlayerModal.jsx";

import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiMessageSquare,
  FiSettings,
  FiHeart,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

export default function MinhasPlaylists() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [videosCurtidos, setVideosCurtidos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, token, logout } = useAuth();

  // ---------- BUSCAR VÍDEOS CURTIDOS ----------
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchVideosCurtidos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos/curtidos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (data.success) {
          setVideosCurtidos(data.videos);
        }
      } catch (err) {
        console.log("Erro ao buscar vídeos curtidos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosCurtidos();
  }, [user, token, navigate]);

  // ---------- ABRIR VÍDEO NO MODAL ----------
  const openVideo = async (video) => {
    setModalVideo(video);
    setModalOpen(true);

    // Salva automaticamente no histórico ao abrir o vídeo
    if (user && token) {
      try {
        await fetch("http://localhost:5000/api/videos/historico", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ videoId: video._id }),
        });
      } catch (err) {
        console.log("Erro ao salvar no histórico", err);
      }
    }
  };

  // ---------- CURTIR VÍDEO ----------
  const likeVideo = async (videoId) => {
    if (!user || !token) {
      alert("Você precisa estar logado para curtir!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/videos/avaliar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (res.ok) {
        setModalVideo((prev) => ({
          ...prev,
          qtdAvaliacoes: data.qtdAvaliacoes,
          jaGostou: true,
        }));
        alert("Vídeo curtido com sucesso!");
      } else {
        alert(data.message || "Erro ao curtir vídeo");
      }
    } catch (err) {
      console.log("Erro ao curtir vídeo", err);
      alert("Erro ao curtir vídeo");
    }
  };

  // ---------- DESCURTIR VÍDEO ----------
  const dislikeVideo = async (videoId) => {
    if (!user || !token) {
      alert("Você precisa estar logado!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/videos/descurtir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (res.ok) {
        setModalVideo((prev) => ({
          ...prev,
          qtdAvaliacoes: data.qtdAvaliacoes,
          jaGostou: false,
        }));

        // Remove da lista de curtidos
        setVideosCurtidos((prev) => prev.filter((v) => v._id !== videoId));

        alert("Curtida removida!");
      } else {
        alert(data.message || "Erro ao descurtir vídeo");
      }
    } catch (err) {
      console.log("Erro ao descurtir vídeo", err);
      alert("Erro ao descurtir vídeo");
    }
  };

  // ---------- VERIFICAR SE JÁ CURTIU ----------
  const verificarSeJaCurtiu = async (videoId) => {
    if (!user || !token) return false;

    try {
      const res = await fetch(
        `http://localhost:5000/api/videos/verificar-curtida/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.jaCurtiu || false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (modalVideo && user && token) {
      verificarSeJaCurtiu(modalVideo._id).then((jaCurtiu) => {
        setModalVideo((prev) => ({ ...prev, jaGostou: jaCurtiu }));
      });
    }
  }, [modalVideo?._id, user, token]);

  return (
    <div
      className="flex min-h-screen transition-colors duration-500"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 flex flex-col h-screen sticky top-0 transition-all duration-300`}
        style={{ backgroundColor: palette.main, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
            <FiMenu size={24} />
          </button>
        </div>

        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex items-center mb-4 cursor-pointer hover:opacity-80"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen">
        {/* HEADER */}
        <header
          className="flex items-center p-4 shadow-md border-b sticky top-0 z-20 transition-colors duration-500"
          style={{ backgroundColor: palette.main, borderColor: palette.accent }}
        >
          <div className="flex-1"></div>

          <div className="flex-1 flex justify-center">
            <img
              src="/arvore.png"
              alt="Logo"
              className="h-20 w-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette}
            />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-5 text-white">
            <a href="#">Quer ser um patrocinador?</a>
            <a href="#">Quer ser um Tutor?</a>

            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.fotoPerfil || "https://via.placeholder.com/40"}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => navigate("/config")}
                />
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-3 py-1 rounded font-semibold hover:brightness-110"
                  style={{ backgroundColor: palette.accent }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded font-semibold hover:brightness-110"
                style={{ backgroundColor: palette.accent }}
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* ÁREA SCROLLÁVEL */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex items-center gap-3">
            <FiHeart size={32} className="text-red-500" />
            <h1 className="text-3xl font-bold">Vídeos Curtidos</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-500">Carregando vídeos curtidos...</div>
            </div>
          ) : videosCurtidos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <FiHeart size={64} className="mb-4 opacity-30" />
              <p className="text-xl">Você ainda não curtiu nenhum vídeo</p>
              <p className="text-sm mt-2">Explore nossos tutoriais e curta seus favoritos!</p>
              <button
                onClick={() => navigate("/tutoriais")}
                className="mt-6 px-6 py-3 rounded-lg font-semibold text-white"
                style={{ backgroundColor: palette.main }}
              >
                Ver Tutoriais
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                Você curtiu {videosCurtidos.length} vídeo{videosCurtidos.length !== 1 ? "s" : ""}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosCurtidos.map((video) => {
                  const youtubeId =
                    video.link.split("youtu.be/")[1]?.split("?")[0] ||
                    video.link.split("v=")[1]?.split("&")[0];

                  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

                  return (
                    <div
                      key={video._id}
                      className="rounded-xl overflow-hidden shadow-lg bg-white hover:scale-[1.02] transition-all cursor-pointer relative group"
                      onClick={() => openVideo(video)}
                    >
                      {/* Badge de curtido */}
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                        <FiHeart size={12} fill="white" />
                        Curtido
                      </div>

                      <img src={thumbnail} className="w-full h-44 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{video.titulo}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {video.qtdAvaliacoes || 0} curtidas
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>

      {/* MODAL */}
      {modalOpen && modalVideo && (
        <VideoPlayerModal
          video={modalVideo}
          onClose={() => setModalOpen(false)}
          onLike={likeVideo}
          onDislike={dislikeVideo}
          jaCurtiu={modalVideo.jaGostou}
        />
      )}
    </div>
  );
}