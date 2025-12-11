import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
import { useAuth } from "../components/AuthContext.jsx";

import {
  FiMenu,
  FiHome,
  FiStar,
  FiClock,
  FiList,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiLogOut,
  FiSun,
  FiBell,
  FiMessageSquare,
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

export default function Configuracoes() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("perfil");

  const [editNomeOpen, setEditNomeOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");

  const navigate = useNavigate();
  const { palette, changePalette } = useTheme();
  const { user, setUser, logout } = useAuth();

  // 📌 Upload real
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

  // 📌 Atualizar nome
  const salvarNome = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoNome }),
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEditNomeOpen(false);
      alert("Nome atualizado!");
    } else {
      alert("Erro ao atualizar nome");
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 flex flex-col transition-all duration-300`}
        style={{ backgroundColor: palette.main, color: "white" }}
      >
        <div className="flex justify-between items-center mb-6">
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
              className="flex items-center mb-4 cursor-pointer hover:opacity-80"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="flex items-center p-4 shadow-md border-b sticky top-0 z-20"
          style={{ backgroundColor: palette.main }}
        >
          {/* Espaço lateral esquerdo (vazio) */}
          <div className="flex-1"></div>

          {/* Logo central */}
          <div className="flex-1 flex justify-center">
            <img
              src="/arvore.png"
              alt="Logo"
              className="h-20 w-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={changePalette}
            />
          </div>

          {/* Área direita: foto + botão sair */}
          <div className="flex-1 flex justify-end items-center gap-5">
            <img
              src={user?.fotoPerfil || "/user.png"}
              alt="Perfil"
              className="h-10 w-10 rounded-full border cursor-pointer"
              onClick={() => navigate("/config")}
            />

            <button
              onClick={() => {
                logout();             // limpa usuário
                navigate("/login");   // redireciona corretamente ✔
              }}
              className="px-4 py-2 rounded font-semibold bg-red-500 text-white hover:brightness-110"
            >
              Sair
            </button>
          </div>
        </header>


        {/* Main */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Configurações</h1>

          {/* Perfil */}
          <div
            className="p-6 rounded shadow-md"
            style={{ backgroundColor: palette.card }}
          >
            <h2 className="text-2xl font-bold mb-4">Informações do Usuário</h2>

            <p><strong>Nome:</strong> {user?.nome}</p>
            <p><strong>Email:</strong> {user?.email}</p>

            <div className="flex gap-4 mt-6">
              {/* Alterar Foto */}
              <label className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer flex items-center gap-2">
                <FiUser /> Alterar Foto
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>

              {/* Alterar Nome */}
              <button
                onClick={() => {
                  setEditNomeOpen(!editNomeOpen);
                  setNovoNome(user?.nome || ""); // ✅ Inicializa o input com o nome atual
                }}
                className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
              >
                <FiUser /> Alterar Nome
              </button>
            </div>

            {/* Área expandida */}
            {editNomeOpen && (
              <div className="mt-4 p-4 bg-gray-200 rounded">
                <label className="font-semibold">Novo nome:</label>
                <input
                  type="text"
                  className="w-full p-2 rounded mt-2"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  autoFocus // ✅ Para focar automaticamente quando abrir
                />
                <button
                  onClick={salvarNome}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Salvar
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
