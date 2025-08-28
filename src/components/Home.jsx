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

// Exemplos de vídeos
const tutorials = [
  { title: "Como organizar seus estudos", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  { title: "Aprenda a usar planilhas no dia a dia", img: "https://images.unsplash.com/photo-1581090700227-4c4f50b1d6c5" },
  { title: "Dicas rápidas de produtividade", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
  { title: "Guia básico de finanças pessoais", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f" },
  { title: "Aprenda a escrever melhor", img: "https://images.unsplash.com/photo-1509057199576-632a47484ece" },
  { title: "Como pesquisar com eficiência", img: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02" },
];

const mainColor = "#1E293B";
const accentColor = "#38BDF8";
const bgLight = "#F1F5F9";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();

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

      
      <div className="flex-1 flex flex-col">
      {/* HEADER */}
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


        {/* MAIN */}
        <main className="flex-1 p-6 overflow-auto space-y-12">
          {/* Banner Principal */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Destaque</h2>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                alt="Destaque"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className="text-2xl font-bold">Novo Guia de Produtividade</h3>
                <p className="text-sm mt-2">Assista agora e aprenda a organizar melhor sua rotina!</p>
              </div>
            </div>
          </section>

          {/* Veja Novamente */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Veja novamente</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {tutorials.slice(0, 4).map((tut, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform bg-white"
                >
                  <img src={tut.img} alt={tut.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold text-md">{tut.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recomendados */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recomendados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tut, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white"
                >
                  <img src={tut.img} alt={tut.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{tut.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Em Alta */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Mais vistos / Em alta</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tutorials.slice().reverse().map((tut, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform bg-white"
                >
                  <img src={tut.img} alt={tut.title} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{tut.title}</h3>
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
