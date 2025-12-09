import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Loginpage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showLogin, setShowLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const [regNome, setRegNome] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSenha, setRegSenha] = useState("");
  const [regConfirmar, setRegConfirmar] = useState("");

  const [msg, setMsg] = useState("");

  const API_URL = "http://localhost:5000/api/auth";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, senha: loginSenha }),
      });

      const data = await response.json();

      if (!data.success) {
        setMsg(data.error || "Erro ao fazer login");
        return;
      }

      login(data.user, data.token); // salva no contexto
      navigate("/");

    } catch {
      setMsg("Erro na conexão com o servidor.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    if (regSenha !== regConfirmar) {
      setMsg("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: regNome,
          email: regEmail,
          senha: regSenha,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setMsg(data.error || "Erro ao registrar");
        return;
      }

      login(data.user, data.token);
      navigate("/");

    } catch {
      setMsg("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
      <div className="w-[1000px] h-[600px] bg-gray-600 border border-[#1E293B] rounded-lg p-10 shadow-lg">

        <div className="flex w-full h-full rounded-lg overflow-hidden">

          {/* LOGIN */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out
            ${showLogin ? "bg-[#1E293B]" : "bg-gray-600"}`}
          >
            <div className={`${showLogin ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"} transition-all duration-500`}>

              <h2 className="text-2xl font-bold text-center mb-6 text-white">Entrar</h2>

              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full mb-4 p-2 rounded-lg border"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="bg-white w-full mb-4 p-2 rounded-lg border"
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                />

                <button className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg">
                  Acessar
                </button>

                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="w-full bg-[#38BDF8] mt-3 text-white font-semibold py-2 rounded-lg"
                >
                  Não tenho uma conta...
                </button>

                {showLogin && msg && <p className="text-center mt-4 text-white/80 text-sm">{msg}</p>}
              </form>
            </div>
          </div>

          {/* REGISTRO */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out
            ${!showLogin ? "bg-[#1E293B]" : "bg-gray-600"}`}
          >
            <div className={`${!showLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"} transition-all duration-500`}>

              <h2 className="text-2xl font-bold text-white mb-6 text-center">Registre-se</h2>

              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border"
                  value={regNome}
                  onChange={(e) => setRegNome(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border"
                  value={regSenha}
                  onChange={(e) => setRegSenha(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  className="bg-gray-50 w-full mb-6 p-2 rounded-lg border"
                  value={regConfirmar}
                  onChange={(e) => setRegConfirmar(e.target.value)}
                />

                <button className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg">
                  Registrar
                </button>

                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-[#38BDF8] mt-3 text-white font-semibold py-2 rounded-lg"
                >
                  Já tenho uma conta...
                </button>

                {!showLogin && msg && <p className="text-center mt-4 text-white/80 text-sm">{msg}</p>}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
