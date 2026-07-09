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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2jHUhF7viWClenIJuTVl7dJnknPPtn2ixWpxtAn03JZcYpzS7ZXdyE11UoFjZT8ZnKQ/exec"; 
    
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
                const nomeOriginal = p.nome || "Presente Especial";
                const total = parseFloat(p.total || 0);
                const recebido = parseFloat(p.recebido || 0);
                const falta = total - recebido;
                const progresso = total > 0 ? Math.min((recebido / total) * 100, 100) : 0;

                if (falta <= 0 && total > 0) return ''; 

                const fotoUrl = p.foto || "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop";
                const nomeSeguro = String(nomeOriginal).replace(/'/g, "\\'");

                return `
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                        <div class="h-48 overflow-hidden relative bg-cream-dark">
                            <img src="${fotoUrl}" alt="${nomeOriginal}" class="w-full h-full object-cover hover:scale-110 transition duration-500">
                        </div>
                        <div class="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 class="font-bold text-gray-800 text-lg mb-1">${nomeOriginal}</h3>
                                <p class="text-sm text-primary font-bold mb-4">R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                            </div>
                            <button onclick="prepararPresente('${p.id}', '${nomeSeguro}', ${falta})" 
                                    class="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-dark transition shadow-md active:scale-95">
                                Presentear
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        } catch (error) { console.error("Erro ao carregar:", error); }
    }

    carregarPresentes();
    
    // Countdown
    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();
    function updateCountdown() {
        const distance = weddingDate - new Date().getTime();
        document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
    }
    setInterval(updateCountdown, 1000);
});

// Modal e Lógica de Pagamento
const pixModal = document.getElementById('pixModal');
const closePixModalBtn = document.getElementById('closePixModal');
const confirmGiftBtn = document.getElementById('confirmGiftBtn');
const pixPaymentArea = document.getElementById('pixPaymentArea');
const modalPresenteNome = document.getElementById('modalPresenteNome');
const qrCodeImg = document.getElementById('qrCodeImg');
const pixKeyText = document.getElementById('pixKey');
const copyPixBtn = document.getElementById('copyPixBtn');
const chavePix = "d47413ee-b96f-43a9-8a55-ab37cf76e1e2";

window.prepararPresente = function(id, nome, valorFaltante) {
    modalPresenteNome.innerHTML = `Você está presenteando: <br><span class="font-bold text-accent text-base italic">${nome}</span>`;
    document.getElementById('donorName').value = '';
    document.getElementById('donorValue').value = valorFaltante > 0 ? valorFaltante : '';
    
    const linkCartaoBtn = document.getElementById('linkCartao');
    const cartaoContainer = document.getElementById('cartaoContainer');
    const linksMercadoPago = {
        150: "https://mpago.la/2csAeau",
        200: "https://mpago.la/13QJiAn",
        250: "https://mpago.la/1HKF6FM",
        300: "https://mpago.la/2uFDGUm",
        350: "https://mpago.la/2NELcbT",
        400: "https://mpago.la/2jzEYcq",
        500: "https://mpago.la/11FkJL5",
        550: "https://mpago.la/1WrTVhj",
        700: "https://mpago.la/2CDdRvR",
        800: "https://mpago.la/1ph6fUF",
        1000: "https://mpago.la/1U48UrC",
        1200: "https://mpago.la/1XGG7GJ",
        1500: "https://mpago.la/2EnzNL1",
        2000: "https://mpago.la/1MbAZp4",
        2500: "https://mpago.la/26xJM1r",
        3000: "https://mpago.la/2LM6BUD",
        3500: "https://mpago.la/1Kh9ZHF",
        5000: "https://mpago.la/2vJrSFb"
    };
    // CORREÇÃO: Arredonda o valor para evitar que 2000.0000001 vire 2500
    const val = Math.round(parseFloat(valorFaltante) * 100) / 100;
    
    const valoresDisponiveis = Object.keys(linksMercadoPago).map(Number).sort((a, b) => a - b);
    const valorIdeal = valoresDisponiveis.find(valorDaLista => valorDaLista >= val);

    // --- INÍCIO DOS TESTES (CONSOLE) ---
    console.log("=== DEBUG DO PAGAMENTO VIA CARTÃO ===");
    console.log("1. Valor bruto vindo do botão (valorFaltante):", valorFaltante);
    console.log("2. Valor corrigido e arredondado (val):", val);
    console.log("3. Valor ideal encontrado na constante:", valorIdeal);
    
    if (valorIdeal) {
        linkCartaoBtn.href = linksMercadoPago[valorIdeal];
        linkCartaoBtn.innerHTML = `Acessar Link de Pagamento (R$ ${valorIdeal})`;
        cartaoContainer.classList.remove('hidden');
        
        console.log("4. Link injetado no botão:", linksMercadoPago[valorIdeal]);
    } else {
        cartaoContainer.classList.add('hidden');
        console.log("4. Nenhum valor da constante cobre o presente. Cartão oculto.");
    }
    console.log("=======================================");
    // --- FIM DOS TESTES ---

    pixPaymentArea.classList.add('hidden');
    pixModal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

closePixModalBtn.addEventListener('click', () => pixModal.classList.add('hidden'));

let payloadPixAtual = ""; 
confirmGiftBtn.addEventListener('click', () => {
    const nomeDoador = document.getElementById('donorName').value;
    const valorDoador = document.getElementById('donorValue').value;
    if (!nomeDoador || !valorDoador || valorDoador <= 0) return alert("Preencha seu nome e valor.");
    pixPaymentArea.classList.remove('hidden');
    payloadPixAtual = getPixPayload(chavePix, "Livia e Taylor", "Marilia", valorDoador);
    pixKeyText.textContent = payloadPixAtual;
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payloadPixAtual)}`;
});

copyPixBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(payloadPixAtual).then(() => {
        const original = copyPixBtn.innerHTML;
        copyPixBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-green-600"></i>';
        setTimeout(() => { copyPixBtn.innerHTML = original; }, 2000);
    });
});

function getPixPayload(chavePix, recebedor, cidade, valor) {
    const field = (id, value) => `${id}${String(value.length).padStart(2, '0')}${value}`;
    const payload = "000201" + field("26", field("00", "br.gov.bcb.pix") + field("01", chavePix)) + "520400005303986" + field("54", parseFloat(valor).toFixed(2)) + "5802BR" + field("59", "Livia e Taylor") + field("60", "Marilia") + "62070503***6304";
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
        crc ^= payload.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : (crc << 1);
    }
    return payload + (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
// Lógica do Player de Música
const audio = document.getElementById('siteMusic');
const musicToggle = document.getElementById('musicToggle');
const musicPlayerInfo = document.getElementById('music-player-info');
const musicIcon = document.getElementById('musicIcon');

// Tenta tocar automaticamente ao carregar (o navegador pode bloquear)
window.addEventListener('load', () => {
    setTimeout(() => {
        musicPlayerInfo.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        audio.play().then(() => {
            // Sucesso na reprodução automática
        }).catch(error => {
            console.log("Reprodução automática bloqueada pelo navegador. O usuário precisa interagir.");
        });
    }, 1000);
});

// Botão de controle
musicToggle.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicIcon.setAttribute('data-lucide', 'music');
    } else {
        audio.pause();
        musicIcon.setAttribute('data-lucide', 'pause');
    }
    // Atualiza o ícone via Lucide
    if (typeof lucide !== 'undefined') lucide.createIcons();
});