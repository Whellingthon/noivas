
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

    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();
    const pixKeyValue = "d47413ee-b96f-43a9-8a55-ab37cf76e1e2"; 
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
                const nomeOriginal = p.NOME || p.nome || "Presente Especial";
                const total = parseFloat(p.VALOR || p.total || 0);
                const recebido = parseFloat(p.RECEBIDO || p.recebido || 0);
                const falta = total - recebido;
                const progresso = total > 0 ? Math.min((recebido / total) * 100, 100) : 0;

                if (falta <= 0 && total > 0) return ''; 


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
    
   
});
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


if (typeof lucide !== 'undefined') {
    setTimeout(() => {
        lucide.createIcons();
    }, 500); 
}
document.addEventListener('DOMContentLoaded', () => {
  
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
   
    const inputValor = document.getElementById('donorValue');
    inputValor.value = valorFaltante > 0 ? valorFaltante : '';
    
    pixPaymentArea.classList.add('hidden');
    

    pixModal.classList.remove('hidden');
    
   
    if (typeof lucide !== 'undefined') lucide.createIcons();
};


closePixModalBtn.addEventListener('click', () => {
    pixModal.classList.add('hidden');
});


pixModal.addEventListener('click', (e) => {
    if (e.target === pixModal) {
        pixModal.classList.add('hidden');
    }
});


// A variável global chavePix permanece inalterada
// const chavePix = "d47413ee-b96f-43a9-8a55-ab37cf76e1e2";

// Variável para armazenar o código Copia e Cola gerado
let payloadPixAtual = ""; 

confirmGiftBtn.addEventListener('click', () => {
    const nomeDoador = document.getElementById('donorName').value;
    const valorDoador = document.getElementById('donorValue').value;

    if (!nomeDoador || !valorDoador || valorDoador <= 0) {
        alert("Por favor, preencha seu nome e um valor válido para prosseguir.");
        return;
    }

    pixPaymentArea.classList.remove('hidden');
    
    // Gera a string BR Code estruturada. 
    // Adapte o nome e a cidade se necessário.
    payloadPixAtual = getPixPayload(chavePix, "Livia e Taylor", "Marilia", valorDoador);

    // O ideal é exibir o código PIX Copia e Cola completo para o usuário poder copiar
    pixKeyText.textContent = payloadPixAtual;

    // Gera o QR Code passando o payload estruturado (BR Code)
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payloadPixAtual)}`;
});
copyPixBtn.addEventListener('click', () => {
    // Copia o payload completo (Copia e Cola) que geramos no botão de confirmar
    navigator.clipboard.writeText(payloadPixAtual).then(() => {
        const iconeOriginal = copyPixBtn.innerHTML;
        copyPixBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-green-600"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
        setTimeout(() => {
            copyPixBtn.innerHTML = iconeOriginal;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar', err);
        alert("Erro ao copiar a chave PIX. Tente selecionar o texto e copiar manualmente.");
    });
});
// Função para montar a string do Pix Copia e Cola (Padrão EMVCo)
function getPixPayload(chavePix, recebedor, cidade, valor) {
    const pad = (str) => str.length.toString().padStart(2, '0');
    const field = (id, value) => `${id}${pad(value)}${value}`;

    const gui = field("00", "br.gov.bcb.pix");
    const key = field("01", chavePix);
    const accountInfo = field("26", gui + key);

    // O recebedor e a cidade não podem ter acentos e possuem limite de caracteres
    const merchantName = field("59", recebedor.substring(0, 25).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    const merchantCity = field("60", cidade.substring(0, 15).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    
    let amountField = "";
    if (valor && parseFloat(valor) > 0) {
        amountField = field("54", parseFloat(valor).toFixed(2));
    }

    const payload = "000201" + 
                    accountInfo + 
                    "52040000" + 
                    "5303986" + 
                    amountField + 
                    "5802BR" + 
                    merchantName + 
                    merchantCity + 
                    field("62", field("05", "***"));

    const payloadWithCrcTemplate = payload + "6304";
    
    // Cálculo do CRC16 exigido pelo Banco Central
    let crc = 0xFFFF;
    for (let i = 0; i < payloadWithCrcTemplate.length; i++) {
        crc ^= payloadWithCrcTemplate.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : (crc << 1);
        }
    }
    const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    
    return payloadWithCrcTemplate + crcHex;
}