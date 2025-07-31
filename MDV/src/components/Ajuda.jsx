import React from "react";

export default function Ajudas () {
    return(
        <div className="min-h-screen bg-green-100 px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
                    Central de Ajuda
                </h1>
            
            <p className="text-gray-700 text-center mb-8">
                Aqui você encontra respostas para dúvidas comuns sobre o uso do site.
            </p>

            <div className="space-y-6">
                {/*Pergunta 1*/}
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                ❓ Como me cadastro no site?
                </h2>
                <p className="text-gray-600 mt-1">
                    Basta clicar no botão "Cadastrar" no topo da página e preencher as informações
                    necessárias. O processo é rápido e gratuito.
                </p>
            </div>

            {/*Pergunta 2*/}
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                ❓ Preciso pagar para acessar os tutoriais?
                </h2>
                <p className="text-gray-600 mt-1">
                Não. Todos os tutoriais disponíveis são 100% gratuitos para usuários registrados.
                </p>
            </div>

            {/*Pergunta 3*/}
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                ❓ Esqueci minha senha. O que faço?
                </h2>
                <p className="text-gray-600 mt-1">
                Na página de login, clique em "Esqueci minha senha" e siga as instruções para redefinir sua senha.
                </p>
            </div>

        
            </div>
        </div>
    </div>

    );

}