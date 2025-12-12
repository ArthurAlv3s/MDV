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
  FiSettings,
  FiMessageSquare,
  FiHeart,
} from "react-icons/fi";

// ----- MENU -----
const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);

  const [videos, setVideos] = useState([]);
  const [videosEmDestaque, setVideosEmDestaque] = useState([]);
  const [videosCurtidos, setVideosCurtidos] = useState([]);

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, token, logout } = useAuth();

  // ---------- BUSCAR VÍDEOS DO BANCO ----------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);

          // Separa vídeos em destaque (maior qtdAvaliacoes)
          const destaques = [...data]
            .sort((a, b) => b.qtdAvaliacoes - a.qtdAvaliacoes)
            .slice(0, 3);
          setVideosEmDestaque(destaques);

          // Se usuário logado, busca vídeos curtidos
          if (user && token) {
            fetchVideosCurtidos();
          }
        }
      } catch (err) {
        console.log("Erro ao carregar vídeos", err);
      }
    };

    fetchVideos();
  }, [user, token]);

  // ---------- BUSCAR VÍDEOS CURTIDOS PELO USUÁRIO ----------
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
    }
  };

  // ---------- ABRIR O MODAL + SALVAR NO HISTÓRICO AUTOMATICAMENTE ----------
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

  // ---------- LIKE (apenas uma vez por vídeo) ----------
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
        // Atualiza o vídeo no modal
        setModalVideo((prev) => ({
          ...prev,
          qtdAvaliacoes: data.qtdAvaliacoes,
          jaGostou: true,
        }));

        // Atualiza lista de vídeos
        setVideos((prev) =>
          prev.map((v) =>
            v._id === videoId ? { ...v, qtdAvaliacoes: data.qtdAvaliacoes } : v
          )
        );

        alert("Vídeo curtido com sucesso!");
      } else {
        alert(data.message || "Erro ao curtir vídeo");
      }
    } catch (err) {
      console.log("Erro ao curtir vídeo", err);
      alert("Erro ao curtir vídeo");
    }
  };

  // ---------- DESCURTIR ----------
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
        // Atualiza o vídeo no modal
        setModalVideo((prev) => ({
          ...prev,
          qtdAvaliacoes: data.qtdAvaliacoes,
          jaGostou: false,
        }));

        // Atualiza lista de vídeos
        setVideos((prev) =>
          prev.map((v) =>
            v._id === videoId ? { ...v, qtdAvaliacoes: data.qtdAvaliacoes } : v
          )
        );

        // Remove dos curtidos
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
  // ---------- VERIFICA SE USUÁRIO JÁ CURTIU O VÍDEO ----------
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

  // Quando abre o modal, verifica se já curtiu
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
  className={`${
    menuOpen ? "w-64" : "w-16"
  } p-4 flex flex-col h-screen fixed top-0 left-0 transition-all duration-300 z-30`}
  style={{ backgroundColor: palette.main, color: "white" }}
>

        <div className="flex justify-between items-center mb-10">
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
              className="flex items-center mb-8 cursor-pointer hover:opacity-80"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
<div className="mt-auto w-full pb-4 flex justify-center">
  {menuOpen ? (
    <div
      className="text-xs opacity-70 leading-tight text-center"
      style={{ color: "white" }}
    >
      Tudo neste site é de direito exclusivo.<br />
      © {new Date().getFullYear()}
    </div>
  ) : (
    <div
      className="text-[11px] opacity-90 leading-none text-center w-full"
      title={`Tudo neste site é de direito exclusivo. © ${new Date().getFullYear()}`}
      style={{ color: "white" }}
    >
      © {new Date().getFullYear()}
    </div>
  )}
</div>

      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div
  className="flex-1 flex flex-col h-screen transition-all duration-300"
  style={{ marginLeft: menuOpen ? "16rem" : "4rem" }} // NÃO AFETA O HEADER
>

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

          <div className="text-sm flex-1 flex justify-end items-center space-x-5 text-white">
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
        <main className="flex-1 overflow-auto p-6 space-y-12">
          {/* VÍDEOS EM DESTAQUE */}
          <section>
            <h2 className="text-3xl font-bold mb-4"> Em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosEmDestaque.map((video) => {
                const youtubeId =
                  video.link.split("youtu.be/")[1]?.split("?")[0] ||
                  video.link.split("v=")[1]?.split("&")[0];

                const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

                return (
                  <div
                    key={video._id}
                    className="rounded-xl overflow-hidden shadow-lg bg-white hover:scale-[1.02] transition-all cursor-pointer relative"
                    onClick={() => openVideo(video)}
                  >
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                       Destaque
                    </div>
                    <img src={thumbnail} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{video.titulo}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {video.qtdAvaliacoes} curtidas
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* VÍDEOS CURTIDOS (só aparece se logado) */}
          {user && videosCurtidos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4"> Vídeos que Você Curtiu</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosCurtidos.map((video) => {
                  const youtubeId =
                    video.link.split("youtu.be/")[1]?.split("?")[0] ||
                    video.link.split("v=")[1]?.split("&")[0];

                  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

                  return (
                    <div
                      key={video._id}
                      className="rounded-xl overflow-hidden shadow-lg bg-white hover:scale-[1.02] transition-all cursor-pointer"
                      onClick={() => openVideo(video)}
                    >
                      <img src={thumbnail} className="w-full h-44 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{video.titulo}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {video.qtdAvaliacoes} curtidas
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* TODOS OS VÍDEOS */}
          <section>
            <h2 className="text-2xl font-bold mb-4"> Todos os Vídeos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const youtubeId =
                  video.link.split("youtu.be/")[1]?.split("?")[0] ||
                  video.link.split("v=")[1]?.split("&")[0];

                const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

                return (
                  <div
                    key={video._id}
                    className="rounded-xl overflow-hidden shadow-lg bg-white hover:scale-[1.02] transition-all cursor-pointer"
                    onClick={() => openVideo(video)}
                  >
                    <img src={thumbnail} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{video.titulo}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {video.qtdAvaliacoes} curtidas
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* ---------- MODAL ---------- */}


      {modalOpen && modalVideo && (
        <VideoPlayerModal
          video={modalVideo}
          onClose={() => setModalOpen(false)}
          onLike={likeVideo}
          onDislike={dislikeVideo}  // ← ADICIONE ISSO
          jaCurtiu={modalVideo.jaGostou}
        />
      )}
    </div>
  );
}