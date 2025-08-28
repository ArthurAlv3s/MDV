import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FiMoon,
  FiBell,
  FiLock,
} from "react-icons/fi";

const menuItems = [
  { name: "Início", icon: <FiHome />, path: "/" },
  { name: "Tutoriais", icon: <FiStar />, path: "/tutoriais" },
  { name: "Minhas Playlists", icon: <FiList />, path: "/playlists" },
  { name: "Chatbot", icon: <FiMessageCircle />, path: "/chatbot" },
  { name: "Histórico", icon: <FiClock />, path: "/historico" },
  { name: "Feedback", icon: <FiMessageCircle />, path: "/feedback" },
  { name: "Configurações", icon: <FiSettings />, path: "/config" },
];

const mainColor = "#1E293B";
const accentColor = "#38BDF8"
const bgLight = "#F1F5F9";

export default function Configuracoes() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("perfil");
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bgLight, color: mainColor }}>
      {/* Sidebar */}
      <aside
        className={`${menuOpen ? "w-64" : "w-16"} p-4 transition-all duration-300 flex flex-col`}
        style={{ backgroundColor: mainColor, color: "white" }}
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
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {menuOpen && <span className="ml-4">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1">

      <header className={`flex items-center p-4 shadow-md border-b bg-[${mainColor}] border-gray-700`}>
        <div className="flex-1"></div>

        <div className="flex-1 flex justify-center">
          <img src="/arvore.png" alt="Logo" className="h-20 w-auto" />
        </div>

        <div className="flex-1 flex justify-end items-center space-x-5">
          <a href="./" className="text-white">Quer ser um patrocinador?</a>
          <a href="./" className="text-white">Quer ser um Tutor?</a>
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-2 rounded font-semibold hover:brightness-110`}
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            Login
          </button>
        </div>
      </header>

          <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">Configurações</h1>

        {/* Seções internas */}
        <div className="flex gap-4 mb-6 border-b pb-2">
          <button
            className={`px-4 py-2 rounded-t ${activeSection === "perfil" ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveSection("perfil")}
          >
            Perfil
          </button>
          <button
            className={`px-4 py-2 rounded-t ${activeSection === "tema" ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveSection("tema")}
          >
            Tema
          </button>
          <button
            className={`px-4 py-2 rounded-t ${activeSection === "notificacoes" ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveSection("notificacoes")}
          >
            Notificações
          </button>
          <button
            className={`px-4 py-2 rounded-t ${activeSection === "senha" ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveSection("senha")}
          >
            Senha
          </button>
        </div>

        {/* Conteúdo das seções */}
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          {/* PERFIL */}
          {activeSection === "perfil" && (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Foto do usuário */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-300">
                  <img
                    src={userPhoto || "https://via.placeholder.com/150"}
                    alt="Foto do usuário"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
              </div>

              {/* Informações do usuário */}
              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold">Informações do Usuário</h2>
                <p><strong>Nome:</strong> Arthur Alves</p>
                <p><strong>Email:</strong> arthur@email.com</p>
                <div className="flex gap-4 mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2">
                    <FiUser /> Editar Perfil
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2">
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TEMA */}
          {activeSection === "tema" && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FiSun /> Preferências de Tema</h2>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 flex items-center gap-2"><FiMoon /> Escuro</button>
                <button className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 flex items-center gap-2"><FiSun /> Claro</button>
              </div>
            </div>
          )}

          {/* NOTIFICAÇÕES */}
          {activeSection === "notificacoes" && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FiBell /> Configurações de Notificação</h2>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" defaultChecked />
                Receber notificações por email
              </label>
              <label className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                Receber notificações push
              </label>
            </div>
          )}

          {/* SENHA */}
          {activeSection === "senha" && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FiLock /> Alterar Senha</h2>
              <div className="flex flex-col gap-3 max-w-md">
                <input type="password" placeholder="Senha atual" className="px-4 py-2 border rounded" />
                <input type="password" placeholder="Nova senha" className="px-4 py-2 border rounded" />
                <input type="password" placeholder="Confirmar nova senha" className="px-4 py-2 border rounded" />
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-32">Atualizar</button>
              </div>
            </div>
          )}
        </div>

          </div>

        
      </main>
    </div>
  );
}
