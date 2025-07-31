import React from "react";

export default function sobre () {
    return(
        <div className="min-h-screen bg-green-100 px-4 py-8">
            <div className="max w-4xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text 3xl font-bold text-green-700 mb-4 text-center">
                    Sobre Nós
                </h1>

                <p className="text-gray-700 mb-6 text-center">
                O <strong>Manual da Vida</strong> é um projeto criado para ajudar pessoas a
                aprenderem tarefas cotidianas de forma rápida, prática e gratuita. Nosso objetivo
                é tornar o conhecimento acessível e direto, focando em tutoriais simples e úteis.
                </p>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">🌱 Nossa Missão</h2>
                        <p className="text-gray-600 mt-1">
                        Democratizar o conhecimento prático, com conteúdos claros e aplicáveis,
                        ajudando pessoas a desenvolver autonomia no dia a dia.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">💡 Como surgiu</h2>
                        <p className="text-gray-600 mt-1">  A ideia nasceu ao percebermos que muitas pessoas têm dúvidas sobre tarefas
                        simples — como emitir um boleto, preencher um formulário, ou até criar um
                        e-mail — e queríamos centralizar esse tipo de conteúdo num só lugar.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">🤝 Colabore com a gente</h2>
                        <p className="text-gray-600 mt-1">
                        Tem um conhecimento prático que pode ajudar outras pessoas? Em breve, você
                        poderá enviar seus próprios tutoriais para colaborar com a comunidade!
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );

}