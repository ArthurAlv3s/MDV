import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Loginpage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const API_URL = "http://localhost:5000/api/auth";

  // LOGIN
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  // REGISTRO
  const [registerData, setRegisterData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // ------ LOGIN HANDLER ------
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!data.success) {
        setMsg(data.error || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch {
      setMsg("Erro na conexão com o servidor.");
    }

    setLoading(false);
  };

  // ------ REGISTER HANDLER ------
  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    if (registerData.senha !== registerData.confirmarSenha) {
      setMsg("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: registerData.nome,
          email: registerData.email,
          senha: registerData.senha,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setMsg(data.error || "Erro ao registrar");
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate("/");
    } catch {
      setMsg("Erro na conexão com o servidor.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F1F5F9] overflow-hidden">

      {/* SHAPES DE FUNDO */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#1E293B] to-[#1E293B] rounded-br-[300px] transform -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E293B] to-[#1E293B] rounded-tl-[350px] transform translate-x-1/3 translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-gradient-to-tr from-[#1E293B] to-[#1E293B] rounded-tl-[175px] transform translate-x-1/4 translate-y-1/4" />

      {/* CARD */}
      <div className="w-[1000px] h-[600px] bg-gray-600 border border-[#1E293B] rounded-lg p-10 shadow-lg relative z-10">
        <div className="flex w-full h-full rounded-lg overflow-hidden">

          {/* LOGIN AREA */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out ${
              showLogin ? "bg-[#1E293B]" : "bg-gray-600"
            }`}
          >
            <div
              className={`transition-all duration-500 ${
                showLogin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Entrar
              </h2>

              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="bg-white w-full mb-4 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={loginData.senha}
                  onChange={(e) =>
                    setLoginData({ ...loginData, senha: e.target.value })
                  }
                  className="bg-white w-full mb-4 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9]"
                  >
                    {loading ? "Entrando..." : "Acessar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9]"
                  >
                    Não tenho uma conta...
                  </button>
                </div>

                {showLogin && msg && (
                  <p className="text-white/80 text-center mt-4">{msg}</p>
                )}
              </form>
            </div>

            {/* TEXTO AO LADO QUANDO NÃO ESTÁ NO LOGIN */}
            {!showLogin && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                <img
                  src="./public/arvore.png"
                  alt="Logo"
                  className="w-24 h-24 mb-4"
                />
                <h2 className="text-3xl font-bold mb-4">Junte-se ao MDV</h2>
                <p className="max-w-xs text-lg">
                  Crie sua conta e comece sua jornada rumo à{" "}
                  <b>independência!</b>
                </p>
              </div>
            )}
          </div>

          {/* REGISTER AREA */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out ${
              !showLogin ? "bg-[#1E293B]" : "bg-gray-600"
            }`}
          >
            <div
              className={`transition-all duration-500 ${
                !showLogin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Registre-se
              </h2>

              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  value={registerData.nome}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, nome: e.target.value })
                  }
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={registerData.senha}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, senha: e.target.value })
                  }
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={registerData.confirmarSenha}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmarSenha: e.target.value,
                    })
                  }
                  className="bg-gray-50 w-full mb-6 p-2 rounded-lg border focus:outline-none"
                  required
                />

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9]"
                  >
                    {loading ? "Cadastrando..." : "Registrar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9]"
                  >
                    Já tenho uma conta...
                  </button>
                </div>

                {!showLogin && msg && (
                  <p className="text-white/80 text-center mt-4">{msg}</p>
                )}
              </form>
            </div>

            {/* TEXTO AO LADO QUANDO NÃO ESTÁ NO REGISTRO */}
            {showLogin && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                <img
                  src="./public/arvore.png"
                  alt="Logo MDV"
                  className="w-24 h-24 mb-4"
                />
                <h2 className="text-3xl font-bold mb-4">Bem-vindo(a) ao MDV</h2>
                <p className="max-w-xs text-lg">
                  Faça login e explore conteúdos que transformam sua{" "}
                  <b>independência</b>.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
