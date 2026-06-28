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

    // Inicializa os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 1. CONFIGURAÇÕES GLOBAIS ---
    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();
    const pixKeyValue = "livia.taylor@email.com"; 
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2jHUhF7viWClenIJuTVl7dJnknPPtn2ixWpxtAn03JZcYpzS7ZXdyE11UoFjZT8ZnKQ/exec"; 
    
    const siteMusic = document.getElementById('siteMusic');
    const backToTopBtn = document.getElementById('backToTopBtn');
    let presenteAtivo = null;

    // Elementos de Animação Entrada Hero
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
                // Adaptando as chaves em maiúsculo da API para o JavaScript do site
                const nomeOriginal = p.NOME || p.nome || "Presente Especial";
                const total = parseFloat(p.VALOR || p.total || 0);
                const recebido = parseFloat(p.RECEBIDO || p.recebido || 0);
                
                const falta = total - recebido;
                const progresso = total > 0 ? Math.min((recebido / total) * 100, 100) : 0;

                if (falta <= 0 && total > 0) return ''; 

          
                let fotoUrl = "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop"; // Padrão
                const n = nomeOriginal.toLowerCase();

               
                if (n.includes("upgrade")) {fotoUrl = "img/upgradeluamel.jpeg";} 
                else if (n.includes("lua de mel")) {fotoUrl = "img/luamelsonhos.jpeg";} 
                else if (n.includes("hotel") || n.includes("hotelzinho")) fotoUrl = "img/hotelzinhochique.jpeg";
                else if (n.includes("casal raiz")) {fotoUrl = "img/passeiocasaisraiz.jpeg";} 
                else if (n.includes("boletos")) {fotoUrl = "img/passeioboletos.jpeg";}
                else if (n.includes("viagem") || n.includes("sumir")) fotoUrl = "img/viagemaleatoria.jpeg";
                else if (n.includes("café da manhã") || n.includes("cama (sem latido")) fotoUrl = "img/cafecama.jpeg";
                else if (n.includes("fim de semana relax")) fotoUrl = "img/fimdesemanarelax.jpeg";
                else if (n.includes("gasolina")) fotoUrl = "img/gasolinaMes.jpeg";

                // Arthur e Bebê
                else if (n.includes("fralda") || n.includes("socorro")) fotoUrl = "img/fraldabebe.jpeg";
                else if (n.includes("comida") || n.includes("comidinhas")) fotoUrl = "img/comidabebe.jpeg";
                else if (n.includes("roupinha") || (n.includes("roupa") && n.includes("beb")) || n.includes("estilosa")) {fotoUrl = "img/roupabebe.jpeg";}
                else if (n.includes("brinquedo") && (n.includes("bebê") || n.includes("energia"))) fotoUrl = "img/brinquedosenergia.jpeg";
                else if (n.includes("higiene")) fotoUrl = "img/kithigienebebe.jpeg";
                else if (n.includes("pomad")) {
    fotoUrl = "img/pomadasalvadora.jpeg";
}else if (n.includes("surpresa") && n.includes("arthur")) fotoUrl = "img/surpresaarthur.jpeg";

                // Pets (Zeca & Mel / Coleiros)
                else if (n.includes("ração") && n.includes("passar")) fotoUrl = "img/racaopassarinhos.jpeg";
                else if (n.includes("ração premium")) fotoUrl = "img/racaopremium.jpeg";
                else if (n.includes("petisco")) fotoUrl = "img/petiscosexigem.jpeg";
                else if (n.includes("banho") || n.includes("tosa")) fotoUrl = "img/banhotosamimados.jpeg";
                else if (n.includes("brinquedo") && (n.includes("dog") || n.includes("destruir"))) fotoUrl = "img/brinquedosdestruir.jpeg";
                else if (n.includes("caminha nova")) fotoUrl = "img/caminhanovadog.jpeg";
                else if (n.includes("gaiola")) fotoUrl = "img/gaiolatop.jpeg";
                else if (n.includes("passarinho")) {
    fotoUrl = "img/passarinhos.jpeg";
}
else if (n.includes("vitamina") && n.includes("bichinho")) fotoUrl = "img/vitaminasbichinhos.jpeg";
                else if (n.includes("cantinho dos pássaros")) fotoUrl = "img/melhoriascantinho.jpeg";

                // Futebol e Corinthians
                else if (n.includes("timão") || n.includes("manto")) fotoUrl = "img/mantotimao.jpeg";
                else if (n.includes("dia de jogo") || n.includes("cervejinha")) fotoUrl = "img/diajogocerveja.jpeg";
                else if (n.includes("tv maior") || n.includes("sofrer melhor")) fotoUrl = "img/tvmaiorsofrer.jpeg";
                else if (n.includes("churrasco") && n.includes("jogo")) fotoUrl = "img/churrascojogo.jpeg";
                else if (n.includes("sofá") && n.includes("corinthians")) fotoUrl = "img/sofacorinthians.jpeg";
                else if (n.includes("terapia pós-jogo")) fotoUrl = "img/terapiaposjogo.jpeg";

                // Cozinha, Casa e Eletrónicos
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
                // Geladeira cheia
else if (n.includes("geladeira")) {
    fotoUrl = "img/geladeira.jpeg";
}

// Compras do mês
else if (
    n.includes("compra do mês") ||
    n.includes("compras do mês") ||
    n.includes("compra")
) {
    fotoUrl = "img/comprames.jpeg";
}
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
                else if (n.includes("fone")) fotoUrl = "img/microfone-oficial.jpeg";
                else if (n.includes("caixa de som") || n.includes("caixasom")) fotoUrl = "img/Caixasom.jpeg";
                else if (n.includes("tablet")) fotoUrl = "img/tablet.jpeg";
                else if (n.includes("panelas")) fotoUrl = "img/jogopanelas.jpeg";

                // Música, Vaidade e Extras
                else if (n.includes("violão")) fotoUrl = "img/Violao.jpeg";
                // Garanta que esta condição esteja posicionada corretamente no seu noivas.js
else if (n.includes("microfone")) {
    fotoUrl = "img/microfone-oficial.jpeg"; // Use um nome novo e inédito
}
                else if (n.includes("aula de canto") || n.includes("canto")) fotoUrl = "img/canto-oficial.jpeg";
                else if (n.includes("equipamento") && n.includes("music")) {
    fotoUrl = "img/equipamentosmusicais.jpeg";
}else if (n.includes("produção musical")) fotoUrl = "img/producao-oficial.jpeg";
                else if (n.includes("maquiagem")) fotoUrl = "img/KitMaquiagem.jpeg";
                else if (n.includes("perfume")) fotoUrl = "img/perfume.jpeg";
                else if (n.includes("skincare")) fotoUrl = "img/Skincar.jpeg";
                else if (n.includes("cabelo")) fotoUrl = "img/CabeloDiva.jpeg";
                else if (n.includes("unha")) fotoUrl = "img/UnhaFeitas.jpeg";
                else if (n.includes("roupa")) fotoUrl = "img/roupasnovas.jpeg";
                else if (n.includes("sapato")) fotoUrl = "img/sapatos.jpeg";
                else if (n.includes("bolsa")) fotoUrl = "img/bolsas.jpeg";
                else if (n.includes("acessórios")) {
    fotoUrl = "img/acessorios.jpeg";
}
                
                // Diversos (Estudos, Carro, Zoação)
                else if (n.includes("curso")) fotoUrl = "img/cursoOnline.jpeg";
                else if (n.includes("livro")) fotoUrl = "img/livros.jpeg";
                else if (n.includes("workshop")) fotoUrl = "img/workshop.jpeg";
                else if (n.includes("especialização")) fotoUrl = "img/Especializacao.jpeg";
                else if (n.includes("seguro")) fotoUrl = "img/seguro.jpeg";
                else if (n.includes("lavagem") || n.includes("carro")) fotoUrl = "img/lavagemcaprichada.jpeg";
                else if (n.includes("manutenção")) fotoUrl = "img/manutencao.jpeg";
                else if (n.includes("poupança")) { fotoUrl = "img/poupancacasal.jpeg";}
                else if (
    n.includes("reserva de emergência") ||
    n.includes("emergência")
) {
    fotoUrl = "img/ReservaEmergencia.jpeg";
}else if (n.includes("investimento")) {fotoUrl = "img/investimentos.jpeg";}               
                else if (n.includes("fundo") && n.includes("sonho")) {fotoUrl = "img/fundosonhos.jpeg";}
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
                else if (n.includes("dinheiro") || n.includes("dinheirinho") || n.includes("socorro") || n.includes("ajuda")) fotoUrl = "img/amorformadinheiro.jpeg";
                else if (n.includes("cama")) fotoUrl = "img/camasonhos.jpeg";
                else if (n.includes("mimo aleatório")) fotoUrl = "img/mimoaleatorio.jpeg";
                else if (n.includes("vale alegria")) fotoUrl = "img/valealegria.jpeg";
                else if (n.includes("surpresa premium")) fotoUrl = "img/surpresapremium.jpeg";

                // Prepara strings seguras para o clique do botão
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
            
            setTimeout(() => {
                revealOnScroll();
            }, 150);

        } catch (error) {
            console.error("Erro detalhado ao processar presentes:", error);
            container.innerHTML = '<p class="col-span-full text-center text-red-400 py-10">Erro ao carregar os presentes de forma dinâmica.</p>';
        }
    }
    // --- 3. LÓGICA DE FUNCIONAMENTO DO CARROSSEL DE FOTOS ---
    const carouselTrack = document.getElementById('mainCarousel');
    const nextBtn = document.querySelector('.main-carousel-btn.next');
    const prevBtn = document.querySelector('.main-carousel-btn.prev');
    const dotsContainer = document.getElementById('carouselDots');

    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        let currentIndex = 0;

        if (dotsContainer && slides.length > 0) {
            dotsContainer.innerHTML = slides.map((_, i) => `
                <button class="carousel-dot w-2 h-2 rounded-full bg-primary/30 transition-all duration-300 ${i === 0 ? 'bg-accent !w-6' : ''}" data-index="${i}" aria-label="Ir para foto ${i + 1}"></button>
            `).join('');
        }

        const dots = document.querySelectorAll('.carousel-dot');

        const moveToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentIndex = index;
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.remove('bg-primary/30');
                    dot.classList.add('bg-accent', '!w-6');
                } else {
                    dot.classList.remove('bg-accent', '!w-6');
                    dot.classList.add('bg-primary/30');
                }
            });
        };

        if (nextBtn) nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.dataset.index);
                moveToSlide(targetIndex);
            });
        });

        setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 6000);
    }

    // --- 4. CONTROLE DO MODAL ---
    window.prepararPresente = (id, nome, valorSugerido) => {
        presenteAtivo = { id, nome };
        
        document.getElementById('modalPresenteNome').innerHTML = `Você está presenteando: <br><b class="text-primary text-lg">${nome}</b>`;
        document.getElementById('donorValue').value = valorSugerido;
        document.getElementById('donorName').value = ""; 

        const paymentArea = document.getElementById('pixPaymentArea');
        if(paymentArea) paymentArea.classList.add('hidden');
        
        const btn = document.getElementById('confirmGiftBtn');
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i> Confirmar e Ver PIX';

        const pixModal = document.getElementById('pixModal');
        pixModal.classList.remove('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // --- 5. CONFIRMAÇÃO DO POST ---
    const confirmBtn = document.getElementById('confirmGiftBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
            const nomeDoador = document.getElementById('donorName').value;
            const valorDoador = document.getElementById('donorValue').value;

            if (!nomeDoador || !valorDoador) {
                alert("Por favor, preencha seu nome e o valor! ❤️");
                return;
            }

            confirmBtn.disabled = true;
            confirmBtn.innerHTML = 'Enviando...';

            try {
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: presenteAtivo.id,
                        presenteNome: presenteAtivo.nome,
                        nomeDoador: nomeDoador,
                        valor: valorDoador
                    })
                });

                const paymentArea = document.getElementById('pixPaymentArea');
                if (paymentArea) paymentArea.classList.remove('hidden');
                
                confirmBtn.innerHTML = 'Confirmado com sucesso!';
            } catch (error) {
                alert("Erro ao processar. Tente novamente.");
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = 'Confirmar e Ver PIX';
            }
        });
    }

    // Fechar Modal
    const fecharModal = () => {
        document.getElementById('pixModal').classList.add('hidden');
    };
    const closePixBtn = document.getElementById('closePixModal');
    if (closePixBtn) closePixBtn.addEventListener('click', fecharModal);

    // QR Code e Copiar PIX
    const pixKeyElement = document.getElementById('pixKey');
    if (pixKeyElement) pixKeyElement.textContent = pixKeyValue;

    const copyPixBtn = document.getElementById('copyPixBtn');
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pixKeyValue).then(() => {
                alert('Chave PIX copiada!');
            });
        });
    }

    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrCodeImg) qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixKeyValue)}`;

    // --- 6. CONTROLES DE CONTADORES E SCROLL ---
    setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        if (distance < 0) return;

        const vals = [
            Math.floor(distance / (1000 * 60 * 60 * 24)),
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((distance % (1000 * 60)) / 1000)
        ];
        ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => {
            const el = document.getElementById(id);
            if(el) el.textContent = vals[i].toString().padStart(2, '0');
        });
    }, 1000);

    // Animação ao rolar a página
    function revealOnScroll() {
        document.querySelectorAll(".reveal-on-scroll").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.remove('opacity-0');
                el.classList.add('opacity-100', 'transition-all', 'duration-700');
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);

    // Execução inicial da busca da API
    carregarPresentes();
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