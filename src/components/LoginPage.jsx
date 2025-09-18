import React, { useState } from "react";


export default function Loginpage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
      <div className="w-[1000px] h-[600px] bg-gray-600 border border-[#1E293B] rounded-lg p-10 shadow-lg">
        <div className="flex w-full h-full rounded-lg overflow-hidden">
          
          {/* BLOCO LOGIN */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out
              ${showLogin ? "bg-[#1E293B]" : "bg-gray-600"}`}
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                showLogin ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >

              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Entrar
              </h2>

              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full mb-4 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="bg-white w-full mb-4 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-white border rounded-lg py-2 mb-4 hover:bg-gray-100 transition-all duration-500 ease-in-out"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium">
                    Entre com o Google
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-white border rounded-lg py-2 mb-4 hover:bg-gray-100 transition-all duration-500 ease-in-out"
                >
                  <img
                    src="https://www.svgrepo.com/show/217753/github.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium">
                    Entre com o GitHub
                  </span>
                </button>

                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9] transition-all duration-500 ease-in-out"
                  >
                    Acessar
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9] transition-all duration-500 ease-in-out"
                  >
                    Não tenho uma conta...
                  </button>
                </div>
              </form>
            </div>

            {!showLogin && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-300 opacity-100">
                Área de Login
              </div>
            )}
          </div>

          {/* BLOCO REGISTRO */}
          <div
            className={`w-1/2 p-8 flex flex-col justify-center relative transition-all duration-500 ease-in-out
              ${!showLogin ? "bg-[#1E293B]" : "bg-gray-600"}`}
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                !showLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Registre-se
              </h2>

              <form>
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="bg-gray-50 w-full mb-4 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  className="bg-gray-50 w-full mb-6 p-2 rounded-lg border focus:outline-none transition-all duration-500 ease-in-out"
                  required
                />

                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9] transition-all duration-500 ease-in-out"
                  >
                    Registrar
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="w-full bg-[#38BDF8] text-white font-semibold py-2 rounded-lg hover:bg-[#0ea5e9] transition-all duration-500 ease-in-out"
                  >
                    Já tenho uma conta...
                  </button>
                </div>
              </form>
            </div>

            {showLogin && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-300 opacity-100">
                Área de Registro
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
