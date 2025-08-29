import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
   FiMessageSquare,
  FiSettings,
} from "react-icons/fi";

const accentColor = "#38BDF8";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

const likedPlaylists = [
  { title: "Curtidos do Usuário", img: "https://images.unsplash.com/photo-1581090700227-4c4f50b1d6c5" },
];

const userPlaylistsSample = [
  { title: "Playlist do Estudo", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
  { title: "Playlist de Produtividade", img: "https://images.unsplash.com/photo-1509057199576-632a47484ece" },
];

const mainColor = "#1E293B";
const bgLight = "#F1F5F9";

export default function Mp() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [userPlaylists] = useState(userPlaylistsSample);
  const navigate = useNavigate();

  return (
    <div className="flex" style={{ backgroundColor: bgLight, color: mainColor }}>
      {/* Sidebar fixa */}
      <aside
        className={`fixed top-0 left-0 h-screen ${
          menuOpen ? "w-64" : "w-16"
        } p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hover:opacity-80">
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-auto">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: menuOpen ? "16rem" : "4rem" }}
      >
        {/* Header fixo */}
        <header
          className="fixed top-0 left-0 right-0 flex items-center p-4 shadow-md z-10"
          style={{
            backgroundColor: mainColor,
            marginLeft: menuOpen ? "16rem" : "4rem",
          }}
        >
          <div className="flex-1"></div>

          <div className="flex-1 flex justify-center">
            <img src="/arvore.png" alt="Logo" className="h-20 w-auto" />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-5">
            <a href="./" className="text-white">
              Quer ser um patrocinador?
            </a>
            <a href="./" className="text-white">
              Quer ser um Tutor?
            </a>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded font-semibold hover:brightness-110"
              style={{ backgroundColor: accentColor, color: "#fff" }}
            >
              Login
            </button>
          </div>
        </header>

        {/* Conteúdo rolável */}
        <main className="flex-1 mt-32 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Minhas Playlists</h1>

          {/* Playlist de Curtidos */}
          <section className="mb-6">
            <h2 className="font-semibold text-xl mb-4">Curtidos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedPlaylists.map((playlist, idx) => (
                <div
                  key={`liked-${idx}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={playlist.img}
                    alt={playlist.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{playlist.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Playlists do Usuário */}
          <section className="mb-6">
            <h2 className="font-semibold text-xl mb-4">Suas Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPlaylists.map((playlist, idx) => (
                <div
                  key={`user-${idx}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={playlist.img}
                    alt={playlist.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{playlist.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
