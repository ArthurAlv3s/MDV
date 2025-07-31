import React from "react";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
    const irpara = useNavigate()
    function navegar(){
        irpara("/login")
    }

    function cad() {
    irpara("/registro")
    }

    return (
        <div className="font-sans text-gray-800">
            <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Manual da Vida</div>
                <nav className="space-x-4">
                    <a href="#">Tutoriais</a>
                    <a href="/ajuda">Ajuda</a>
                    <a href="/sobre">Sobre Nós</a>

                </nav>
                <div className="space-x-2">
                   
                    <button onClick={navegar} className="bg-white text-green-700 px-4 py-1 rounded">Entrar</button>
                    
                    <button onClick={cad} className="bg-white text-green-700 px-4 py-1 rounded">Cadastrar</button>

                </div>
            </header>

            <section className="bg-green-100 py-20 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Seja Independente com Conhecimento!</h1>
                <p className="mb-6 text-lg">Aprenda tudo que você precisa para se tornar autossuficiente com nossos tutoriais gratuitos.</p>
                <div className="flex justify-center space-x-2">
                    <select className="px-4 py-2 rounded border">
                        <option>Categorias</option>
                        <option>Financeiro</option>
                        <option>Organização Pessoal</option>
                        <option>Saúde Mental</option>
                        <option>Cozinha</option>
                    </select>
                    <select className="px-4 py-2 rounded border">
                        <option>Filtrar por tipo</option>
                        <option>Texto</option>
                        <option>Áudio</option>
                        <option>Vídeo</option>
                    </select>
                    <button className="bg-green-700 text-white px-6 py-2 rounded">Buscar</button>
                </div>
                <p className="mt-4 text-sm">Destaques: Organize suas finanças, Aprenda a cozinhar, Como lidar com a pressão da faculdade.</p>
            </section>

            <section className="bg-white py-20 px-6 text-center" id="tutoriais">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Tutoriais Populares</h2>
                    <p className="text-gray-600 mb-6">Explore nossos tutoriais e aprenda a conquistar sua independência em várias áreas da vida.</p>
                    <div className="flex justify-center space-x-6">
                        <div className="max-w-xs text-left bg-green-50 p-4 rounded-lg shadow-lg">
                            <h3 className="font-semibold text-lg">Autossuficiência Financeira</h3>
                            <p className="text-sm text-gray-600 mb-3">Aprenda a controlar suas finanças, investir e se organizar financeiramente.</p>
                            <button className="bg-green-700 text-white px-4 py-1 rounded">Ver Tutorial</button>
                        </div>
                        <div className="max-w-xs text-left bg-green-50 p-4 rounded-lg shadow-lg">
                            <h3 className="font-semibold text-lg">Saúde Mental</h3>
                            <p className="text-sm text-gray-600 mb-3">Descubra como cuidar da sua saúde mental, especialmente em momentos de transição.</p>
                            <button className="bg-green-700 text-white px-4 py-1 rounded">Ver Tutorial</button>
                        </div>
                        <div className="max-w-xs text-left bg-green-50 p-4 rounded-lg shadow-lg">
                            <h3 className="font-semibold text-lg">Organização Pessoal</h3>
                            <p className="text-sm text-gray-600 mb-3">Dicas para organizar sua rotina, manter o foco e ser produtivo no seu dia a dia.</p>
                            <button className="bg-green-700 text-white px-4 py-1 rounded">Ver Tutorial</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-green-700 text-white py-20 px-6 text-center" id="sobre">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Sobre o Manual da Vida</h2>
                    <p className="text-lg">O Manual da Vida é uma plataforma dedicada a ajudar pessoas que buscam a independência, seja por necessidade ou por vontade. Oferecemos tutoriais e recursos práticos em diversas áreas da vida.</p>
                    <p className="mt-6">Nossa missão é fornecer informações acessíveis e de qualidade para que você possa conquistar sua liberdade e autossuficiência.</p>
                </div>
            </section>

            <section className="bg-white py-20 px-6 text-center" id="ajuda">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda?</h2>
                    <p className="text-lg mb-6">Nossa inteligência artificial está pronta para te ajudar. Se tiver alguma dúvida, pergunte abaixo!</p>
                    <input
                        type="text"
                        placeholder="Digite sua pergunta aqui..."
                        className="px-4 py-2 rounded border mb-4 w-2/3"
                    />
                    <button className="bg-green-700 text-white px-6 py-2 rounded">Perguntar</button>
                    <p className="mt-6 text-sm">Ou entre em contato com nossa equipe através do email: suporte@manualdavida.com</p>
                </div>
            </section>

            <footer className="bg-green-700 text-white text-center py-6">
                <p>&copy; 2025 Manual da Vida. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
