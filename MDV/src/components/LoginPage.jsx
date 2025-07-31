import React from "react";

export default function Loginpage () {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Entrar</h2>

                <form>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email
                    <input 
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full mt-1 p-2 border rounded"
                    required />
                    </label>
                    
                    <label className="block mb-4 text-sm font-medium text-gray-700">
                        Senha
                        <input type="password"
                        placeholder="********"
                        className="w-full mt-1 p-2 border rounded"
                        required />

                    </label>

                    <button 
                    type="submit"
                    className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition">Entrar</button>
                </form>

                <p className="mt-4 text-sm text-center">
                    Ainda não tem uma conta?{" "}
                    
                    <a href="/cadastro" className="text-green-700 hover:underline">
                        Cadastre-se
                    </a>
               
                </p>
            
            </div>
        
        </div>
    );
}