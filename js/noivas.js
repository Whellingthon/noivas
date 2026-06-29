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

                // SOLUÇÃO DEFINITIVA: Consome a URL da foto direto da API/Planilha.
                // Caso a propriedade não exista por algum erro, cai na imagem genérica de fallback.
                let fotoUrl = p.FOTO || p.foto || "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop";

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
    // (O restante do seu código original que manipula modais e botões deve continuar aqui caso tenha algo extra omitido, 
    // mas com base no que foi enviado, o fluxo encerra na chamada do carregarPresentes)
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

// Inicialização segura dos ícones
if (typeof lucide !== 'undefined') {
    setTimeout(() => {
        lucide.createIcons();
    }, 500); // Aguarda 500ms para garantir que todos os nós do DOM foram lidos
}
document.addEventListener('DOMContentLoaded', () => {
    // ... seus outros códigos ...
    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
// ==========================================
// LÓGICA DO MODAL PIX E PRESENTES
// ==========================================

// Variáveis do Modal
const pixModal = document.getElementById('pixModal');
const closePixModalBtn = document.getElementById('closePixModal');
const confirmGiftBtn = document.getElementById('confirmGiftBtn');
const pixPaymentArea = document.getElementById('pixPaymentArea');
const modalPresenteNome = document.getElementById('modalPresenteNome');
const qrCodeImg = document.getElementById('qrCodeImg');
const pixKeyText = document.getElementById('pixKey');
const copyPixBtn = document.getElementById('copyPixBtn');

// Chave PIX (ajuste se necessário)
const chavePix = "livia.taylor@email.com";

// 1. Função para Abrir o Modal (Chamada pelo botão "Presentear")
window.prepararPresente = function(id, nome, valorFaltante) {
    // Atualiza o nome do presente no modal
    modalPresenteNome.innerHTML = `Você está presenteando: <br><span class="font-bold text-accent text-base italic">${nome}</span>`;
    
    // Limpa os campos e esconde a área do QR Code toda vez que abrir
    document.getElementById('donorName').value = '';
    
    // Sugere o valor total ou faltante automaticamente
    const inputValor = document.getElementById('donorValue');
    inputValor.value = valorFaltante > 0 ? valorFaltante : '';
    
    pixPaymentArea.classList.add('hidden');
    
    // Exibe o modal
    pixModal.classList.remove('hidden');
    
    // Recarrega os ícones Lucide (caso não apareçam de imediato)
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

// 2. Fechar o Modal clicando no X
closePixModalBtn.addEventListener('click', () => {
    pixModal.classList.add('hidden');
});

// 3. Fechar o Modal clicando fora do quadro branco
pixModal.addEventListener('click', (e) => {
    if (e.target === pixModal) {
        pixModal.classList.add('hidden');
    }
});

// 4. Ação do Botão "Confirmar e Ver PIX"
confirmGiftBtn.addEventListener('click', () => {
    const nomeDoador = document.getElementById('donorName').value;
    const valorDoador = document.getElementById('donorValue').value;

    if (!nomeDoador || !valorDoador || valorDoador <= 0) {
        alert("Por favor, preencha seu nome e um valor válido para prosseguir.");
        return;
    }

    // Mostra a área do QR Code e da Chave PIX
    pixPaymentArea.classList.remove('hidden');
    
    // Define a chave no campo de texto
    pixKeyText.textContent = chavePix;

    // Gera o QR Code visual (usando uma API gratuita baseada na chave)
    // Nota: Para um código PIX Copia e Cola real com o valor exato, seria necessário usar uma biblioteca de Payload PIX, mas este QR Code serve como atalho para a chave.
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(chavePix)}`;
});

// 5. Botão de Copiar Chave PIX
copyPixBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(chavePix).then(() => {
        // Feedback visual mudando o ícone para um "Check" de sucesso
        const iconeOriginal = copyPixBtn.innerHTML;
        copyPixBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-green-600"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        // Volta para o ícone de copiar após 2 segundos
        setTimeout(() => {
            copyPixBtn.innerHTML = iconeOriginal;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar', err);
        alert("Erro ao copiar a chave PIX. Tente selecionar o texto e copiar manualmente.");
    });
});