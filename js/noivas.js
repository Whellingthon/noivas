// ===== CONFIGURAÇÃO INTERNA DO TAILWIND =====
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#7B6F63',
                'primary-light': '#A89B91',
                'primary-dark': '#5C5048',
                secondary: '#9B7B5A',
                accent: '#C9A96E',
                dark: '#2D2520',
                cream: '#FAF6F1',
                'cream-dark': '#F0EAE2',
            },
            fontFamily: {
                wedding: ['"Bad Script"', 'cursive'],
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
            }
        }
    }
};

// ===== COMPORTAMENTOS DO SITE =====
document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') lucide.createIcons();

    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();
    const pixKeyValue = "livia.taylor@email.com"; 
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2jHUhF7viWClenIJuTVl7dJnknPPtn2ixWpxtAn03JZcYpzS7ZXdyE11UoFjZT8ZnKQ/exec"; 
    
    // Animação Entrada Hero
    setTimeout(() => {
        document.querySelectorAll('.reveal-element').forEach(el => {
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-up');
        });
    }, 200);

    async function carregarPresentes() {
        const container = document.getElementById('grid-presentes');
        if (!container) return;

        try {
            const response = await fetch(SCRIPT_URL);
            const presentes = await response.json();

            container.innerHTML = presentes.map(p => {
                const nomeOriginal = p.NOME || p.nome || "Presente Especial";
                const total = parseFloat(p.VALOR || p.total || 0);
                const recebido = parseFloat(p.RECEBIDO || p.recebido || 0);
                const falta = total - recebido;
                const progresso = total > 0 ? Math.min((recebido / total) * 100, 100) : 0;

                if (falta <= 0 && total > 0) return ''; 

                let fotoUrl = "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop";
                const n = nomeOriginal.toLowerCase();

                // ORDEM DE PRECEDÊNCIA (Específicos primeiro, genéricos depois)
                if (n.includes("upgrade")) fotoUrl = "img/upgradeluamel.jpeg";
                else if (n.includes("lua de mel")) fotoUrl = "img/luamelsonhos.jpeg";
                else if (n.includes("hotelzinho")) fotoUrl = "img/hotelzinhochique.jpeg";
                else if (n.includes("casal raiz")) fotoUrl = "img/passeiocasaisraiz.jpeg";
                else if (n.includes("boletos")) fotoUrl = "img/passeioboletos.jpeg";
                else if (n.includes("viagem") || n.includes("sumir")) fotoUrl = "img/viagemaleatoria.jpeg";
                else if (n.includes("café da manhã") || n.includes("cama (sem latido")) fotoUrl = "img/cafecama.jpeg";
                else if (n.includes("fim de semana relax")) fotoUrl = "img/fimdesemanarelax.jpeg";
                else if (n.includes("gasolina")) fotoUrl = "img/gasolinaMes.jpeg";
                else if (n.includes("fralda")) fotoUrl = "img/fraldabebe.jpeg";
                else if (n.includes("comidinhas")) fotoUrl = "img/comidabebe.jpeg";
                else if (n.includes("roupinha") || (n.includes("roupa") && n.includes("beb")) || n.includes("estilosa")) fotoUrl = "img/roupabebe.jpeg";
                else if (n.includes("brinquedo") && (n.includes("bebê") || n.includes("energia"))) fotoUrl = "img/brinquedosenergia.jpeg";
                else if (n.includes("higiene")) fotoUrl = "img/kithigienebebe.jpeg";
                else if (n.includes("pomad")) fotoUrl = "img/pomadasalvadora.jpeg";
                else if (n.includes("surpresa") && n.includes("arthur")) fotoUrl = "img/surpresaarthur.jpeg";
                else if (n.includes("ração") && n.includes("passar")) fotoUrl = "img/racaopassarinhos.jpeg";
                else if (n.includes("ração premium")) fotoUrl = "img/racaopremium.jpeg";
                else if (n.includes("petisco")) fotoUrl = "img/petiscosexigem.jpeg";
                else if (n.includes("banho") || n.includes("tosa")) fotoUrl = "img/banhotosamimados.jpeg";
                else if (n.includes("brinquedo") && (n.includes("dog") || n.includes("destruir"))) fotoUrl = "img/brinquedosdestruir.jpeg";
                else if (n.includes("caminha nova")) fotoUrl = "img/caminhanovadog.jpeg";
                else if (n.includes("gaiola")) fotoUrl = "img/gaiolatop.jpeg";
                else if (n.includes("passarinho")) fotoUrl = "img/passarinhos.jpeg";
                else if (n.includes("vitamina") && n.includes("bichinho")) fotoUrl = "img/vitaminasbichinhos.jpeg";
                else if (n.includes("cantinho dos pássaros")) fotoUrl = "img/melhoriascantinho.jpeg";
                else if (n.includes("timão") || n.includes("manto")) fotoUrl = "img/mantotimao.jpeg";
                else if (n.includes("dia de jogo") || n.includes("cervejinha")) fotoUrl = "img/diajogocerveja.jpeg";
                else if (n.includes("tv maior") || n.includes("sofrer melhor")) fotoUrl = "img/tvmaiorsofrer.jpeg";
                else if (n.includes("churrasco") && n.includes("jogo")) fotoUrl = "img/churrascojogo.jpeg";
                else if (n.includes("sofá") && n.includes("corinthians")) fotoUrl = "img/sofacorinthians.jpeg";
                else if (n.includes("terapia pós-jogo")) fotoUrl = "img/terapiaposjogo.jpeg";
                else if (n.includes("air fryer") || n.includes("airfrier")) fotoUrl = "img/AirFrier.jpeg";
                else if (n.includes("cafeteira")) fotoUrl = "img/cafeteira.jpeg";
                else if (n.includes("churrasco")) fotoUrl = "img/churrasco.jpeg";
                else if (n.includes("jantar")) fotoUrl = "img/jantar.jpeg";
                else if (n.includes("reforma")) fotoUrl = "img/reforma-oficial.jpeg";
                else if (n.includes("pintura")) fotoUrl = "img/pintura-oficial.jpeg";
                else if (n.includes("decoração")) fotoUrl = "img/decornova.jpeg";
                else if (n.includes("planta") || n.includes("matar")) fotoUrl = "img/plantinhas.jpeg";
                else if (n.includes("cortina")) fotoUrl = "img/Cortinas.jpeg";
                else if (n.includes("tapete")) fotoUrl = "img/Tapetes.jpeg";
                else if (n.includes("chaleira")) fotoUrl = "img/chaleira.jpeg";
                else if (n.includes("micro-ondas") || n.includes("microondas")) fotoUrl = "img/microondas.jpeg";
                else if (n.includes("geladeira")) fotoUrl = "img/geladeira.jpeg";
                else if (n.includes("compra do mês") || n.includes("compras do mês")) fotoUrl = "img/comprames.jpeg";
                else if (n.includes("delivery")) fotoUrl = "img/delivery.jpeg";
                else if (n.includes("pizza")) fotoUrl = "img/pizza.jpeg";
                else if (n.includes("colchão")) fotoUrl = "img/colchaonovo.jpeg";
                else if (n.includes("jogo de cama")) fotoUrl = "img/jogocama.jpeg";
                else if (n.includes("cobertor")) fotoUrl = "img/cobertor.jpeg";
                else if (n.includes("travesseiro")) fotoUrl = "img/travasseiro.jpeg";
                else if (n.includes("luz")) fotoUrl = "img/contaluz.jpeg";
                else if (n.includes("água")) fotoUrl = "img/contadagua.jpeg";
                else if (n.includes("internet")) fotoUrl = "img/internet.jpeg";
                else if (n.includes("limpeza")) fotoUrl = "img/produtosLimpeza.jpeg";
                else if (n.includes("lavar")) fotoUrl = "img/maquinalavar.jpeg";
                else if (n.includes("celular")) fotoUrl = "img/celularnovo.jpeg";
                else if (n.includes("notebook")) fotoUrl = "img/notebook.jpeg";
                else if (n.includes("fone de ouvido") || n.includes("headphone") || n.includes("headset")) fotoUrl = "img/foneouvido.jpeg";
                else if (n.includes("microfone")) fotoUrl = "img/microfone-oficial.jpeg";
                else if (n.includes("caixa de som") || n.includes("caixasom")) fotoUrl = "img/Caixasom.jpeg";
                else if (n.includes("tablet")) fotoUrl = "img/tablet.jpeg";
                else if (n.includes("panelas")) fotoUrl = "img/jogopanelas.jpeg";
                else if (n.includes("violão")) fotoUrl = "img/Violao.jpeg";
                else if (n.includes("aula de canto") || n.includes("canto")) fotoUrl = "img/canto-oficial.jpeg";
                else if (n.includes("produção musical")) fotoUrl = "img/producao-oficial.jpeg";
                else if (n.includes("equipamento") && n.includes("music")) fotoUrl = "img/equipamentosmusicais.jpeg";
                else if (n.includes("maquiagem")) fotoUrl = "img/KitMaquiagem.jpeg";
                else if (n.includes("perfume")) fotoUrl = "img/perfume.jpeg";
                else if (n.includes("skincare")) fotoUrl = "img/Skincar.jpeg";
                else if (n.includes("cabelo")) fotoUrl = "img/CabeloDiva.jpeg";
                else if (n.includes("unha")) fotoUrl = "img/UnhaFeitas.jpeg";
                else if (n.includes("roupa")) fotoUrl = "img/roupasnovas.jpeg";
                else if (n.includes("sapato")) fotoUrl = "img/sapatos.jpeg";
                else if (n.includes("bolsa")) fotoUrl = "img/bolsas.jpeg";
                else if (n.includes("acessórios")) fotoUrl = "img/acessorios.jpeg";
                else if (n.includes("curso")) fotoUrl = "img/cursoOnline.jpeg";
                else if (n.includes("livro")) fotoUrl = "img/livros.jpeg";
                else if (n.includes("workshop")) fotoUrl = "img/workshop.jpeg";
                else if (n.includes("especialização")) fotoUrl = "img/Especializacao.jpeg";
                else if (n.includes("seguro")) fotoUrl = "img/seguro.jpeg";
                else if (n.includes("lavagem") || n.includes("carro")) fotoUrl = "img/lavagemcaprichada.jpeg";
                else if (n.includes("manutenção")) fotoUrl = "img/manutencao.jpeg";
                else if (n.includes("poupança")) fotoUrl = "img/poupancacasal.jpeg";
                else if (n.includes("reserva de emergência") || n.includes("emergência")) fotoUrl = "img/ReservaEmergencia.jpeg";
                else if (n.includes("investimento")) fotoUrl = "img/investimentos.jpeg";               
                else if (n.includes("fundo") && n.includes("sonho")) fotoUrl = "img/fundosonhos.jpeg";
                else if (n.includes("amor em forma de dinheiro")) fotoUrl = "img/amorformadinheiro.jpeg";
                else if (n.includes("ajuda pro casal não surtar")) fotoUrl = "img/ajudanaosurtar.jpeg";
                else if (n.includes("dinheirinho abençoado")) fotoUrl = "img/dinheiroabencoado.jpeg";
                else if (n.includes("fundo socorro")) fotoUrl = "img/fundosocorro.jpeg";
                else if (n.includes("vale noite")) fotoUrl = "img/valenoitearthur.jpeg";
                else if (n.includes("vale silêncio")) fotoUrl = "img/valesilencio.jpeg";
                else if (n.includes("dormir até tarde")) fotoUrl = "img/valedormirtarde.jpeg";
                else if (n.includes("maratona de série")) fotoUrl = "img/valemaratona.jpeg";
                else if (n.includes("não fazer nada")) fotoUrl = "img/valenaofazernada.jpeg";
                else if (n.includes("surpresa especial")) fotoUrl = "img/surpresaespecial.jpeg";
                else if (n.includes("presente misterioso")) fotoUrl = "img/presentemisterioso.jpeg";
                else if (n.includes("qualquer desejo")) fotoUrl = "img/valequalquerdoce.jpeg";
                else if (n.includes("pix do bem")) fotoUrl = "img/pixdobem.jpeg";
                else if (n.includes("ajuda livre")) fotoUrl = "img/ajudalivre.jpeg";
                else if (n.includes("contribuição com amor")) fotoUrl = "img/contribuicaoamor.jpeg";
                else if (n.includes("cama")) fotoUrl = "img/camasonhos.jpeg";
                else if (n.includes("mimo aleatório")) fotoUrl = "img/mimoaleatorio.jpeg";
                else if (n.includes("vale alegria")) fotoUrl = "img/valealegria.jpeg";
                else if (n.includes("surpresa premium")) fotoUrl = "img/surpresapremium.jpeg";
                else if (n.includes("dinheiro") || n.includes("dinheirinho") || n.includes("socorro") || n.includes("ajuda")) fotoUrl = "img/amorformadinheiro.jpeg";

                const nomeSeguro = nomeOriginal ? String(nomeOriginal) : "Presente Especial";
                const nomeParaBotao = nomeSeguro.replace(/'/g, "\\'");

                return `
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full card-mimo">
                        <div class="h-48 overflow-hidden relative bg-cream-dark">
                            <img src="${fotoUrl}" alt="${nomeSeguro}" class="w-full h-full object-cover hover:scale-110 transition duration-500" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop';">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 class="font-bold text-gray-800 text-lg mb-1 leading-tight">${nomeSeguro}</h3>
                                <p class="text-sm text-primary font-bold mb-4">
                                    R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                                </p>
                                <div class="w-full bg-gray-100 rounded-full h-2 mb-4">
                                    <div class="bg-accent h-2 rounded-full transition-all duration-1000" style="width: ${progresso}%"></div>
                                </div>
                            </div>
                            <button onclick="prepararPresente('${p.ID || p.id}', '${nomeParaBotao}', ${falta})" 
                                    class="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-dark transition shadow-md active:scale-95">
                                Presentear
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            
            if (typeof lucide !== 'undefined') lucide.createIcons();

        } catch (error) {
            console.error("Erro ao carregar:", error);
        }
    }

    carregarPresentes();
    
    // --- Funções Auxiliares (Carrossel, Modal, Scroll) ---
    // (Restante do seu código original permanece igual)
});

// --- 7. CARROSSEL DE FUNDO HERO ---
const bgItems = document.querySelectorAll('#hero-carousel .carousel-bg-item');
let currentBgIndex = 0;

if (bgItems.length > 0) {
    setInterval(() => {
        bgItems[currentBgIndex].classList.remove('active', 'opacity-100');
        bgItems[currentBgIndex].classList.add('opacity-0');

        currentBgIndex = (currentBgIndex + 1) % bgItems.length;

        bgItems[currentBgIndex].classList.remove('opacity-0');
        bgItems[currentBgIndex].classList.add('active', 'opacity-100');
    }, 5000);
}
// Substitua o bloco do lucide no seu noivas.js por este:
if (typeof lucide !== 'undefined') {
    setTimeout(() => {
        lucide.createIcons();
    }, 500); // Aguarda 500ms para garantir que o rodapé foi lido
}