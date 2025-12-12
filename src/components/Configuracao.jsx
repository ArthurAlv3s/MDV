import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "../components/AuthContext.jsx";
import FeedbackSection from "./feedbacksection.jsx";
import UserInfoSection from "./UserInfoSection.jsx";


import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageSquare />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Configuração", icon: <FiSettings />, path: "/config" },
];

export default function Configuracoes() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [editNomeOpen, setEditNomeOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [userInfoOpen, setUserInfoOpen] = useState(true);

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, setUser, logout } = useAuth();

  const handlePhotoUpload = async (e) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("fotoPerfil", file);

    const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Foto atualizada!");
    } else {
      alert("Erro ao atualizar foto");
    }
  };

const salvarNome = async (novoNome, fechar) => {
  const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: novoNome }),
  });

  const data = await res.json();

  if (data.success) {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    fechar();
    alert("Nome atualizado!");
  } else {
    alert("Erro ao atualizar nome");
  }
};


  return (
    <div className="flex min-h-screen" style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* SIDEBAR */}
      <aside
          className={`${menuOpen ? "w-64" : "w-16"} p-4 flex flex-col h-screen sticky top-0 transition-all duration-300`}
          style={{ backgroundColor: palette.main, color: "white" }}
        >

        <div className="flex justify-between items-center mb-10">
          {menuOpen && <span className="font-bold text-xl">Manual da Vida</span>}
          <button onClick={() => setMenuOpen(!menuOpen)}>
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

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col">
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

        {/* MAIN */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Configurações</h1>

          {/* PERFIL EXPANSÍVEL */}

      <UserInfoSection
        palette={palette}
        user={user}
        handlePhotoUpload={handlePhotoUpload}
        salvarNome={salvarNome}
/>


          {/* FEEDBACK */}
          <FeedbackSection palette={palette} />
        </main>
      </div>
    </div>
  );
}