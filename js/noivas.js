document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURAÇÕES GLOBAIS ---
    const weddingDate = new Date("DEC 19, 2026 10:00:00").getTime();
    const pixKeyValue = "livia.taylor@email.com"; 
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwI2hiayaBATM9iCD9sAih-YRGPpyKi4_vGEGWeUEvJhXyRsJZXcdErz53VXtRrpKC/exec"; 
    
    const siteMusic = document.getElementById('siteMusic');
    const backToTopBtn = document.getElementById('backToTopBtn');
    let presenteAtivo = null;

    // --- 2. LÓGICA DA LISTA DE PRESENTES (LEITURA) ---
    async function carregarPresentes() {
        const container = document.getElementById('grid-presentes');
        if (!container) return;

        try {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <div class="animate-spin inline-block w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full mb-4"></div>
                    <p class="text-gray-400 font-medium italic">Buscando mimos na nossa planilha...</p>
                </div>`;

            const response = await fetch(SCRIPT_URL);
            const presentes = await response.json();

            container.innerHTML = presentes.map(p => {
    const total = parseFloat(p.total);
    const recebido = parseFloat(p.recebido) || 0;
    const falta = total - recebido;
    const progresso = Math.min((recebido / total) * 100, 100);

    if (falta <= 0) return ''; 

    // Imagem padrão caso a coluna E esteja vazia
    const fotoUrl = p.foto || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&fit=crop';

    return `
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full reveal">
            
            <!-- AQUI ESTÁ A MÁGICA: A FOTO DO PRESENTE -->
            <div class="h-48 overflow-hidden">
                <img src="${fotoUrl}" alt="${p.nome}" class="w-full h-full object-cover hover:scale-110 transition duration-500">
            </div>

            <div class="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h3 class="font-bold text-gray-800 text-lg mb-1 leading-tight">${p.nome}</h3>
                    <p class="text-sm text-[var(--primary)] font-bold mb-4">
                        R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </p>
                    
                    <div class="w-full bg-gray-100 rounded-full h-2 mb-4">
                        <div class="bg-green-400 h-2 rounded-full transition-all duration-1000" style="width: ${progresso}%"></div>
                    </div>
                </div>
                
                <button onclick="prepararPresente('${p.id}', '${p.nome}', ${falta})" 
                        class="w-full bg-[var(--primary)] text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md active:scale-95">
                    Presentear
                </button>
            </div>
        </div>
    `;
}).join('');
            
            feather.replace();
            reveal(); 
        } catch (error) {
            container.innerHTML = '<p class="col-span-full text-center text-red-400 py-10">Erro ao carregar a lista. Verifique a URL da API.</p>';
        }
    }

    // --- 3. LÓGICA DO MODAL (ESTADO INICIAL) ---
    window.prepararPresente = (id, nome, valorSugerido) => {
        presenteAtivo = { id, nome };
        
        document.getElementById('modalPresenteNome').innerHTML = `Presenteando: <br><b class="text-[var(--primary)] text-lg">${nome}</b>`;
        document.getElementById('donorValue').value = valorSugerido;
        document.getElementById('donorName').value = ""; 

        // Reseta o estado do modal e bloqueia o PIX
        const paymentArea = document.getElementById('pixPaymentArea');
        if(paymentArea) paymentArea.classList.add('opacity-20', 'pointer-events-none', 'grayscale');
        
        const btn = document.getElementById('confirmGiftBtn');
        btn.disabled = false;
        btn.classList.remove('bg-blue-500', 'bg-gray-800');
        btn.classList.add('bg-green-500');
        btn.innerHTML = 'Confirmar e Ver PIX';
        // Remove qualquer onclick anterior para não bugar
        btn.onclick = null; 

        const pixModal = document.getElementById('pixModal');
        pixModal.classList.remove('hidden');
        setTimeout(() => pixModal.querySelector('div').classList.remove('scale-95'), 10);
        feather.replace();
    };

    // --- 4. ENVIO (POST) E DESTRAVAMENTO DA TELA ---
    const confirmBtn = document.getElementById('confirmGiftBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', async function handleConfirm() {
            const nomeDoador = document.getElementById('donorName').value;
            const valorDoador = document.getElementById('donorValue').value;

            if (!nomeDoador || !valorDoador) {
                alert("Por favor, mestre, preencha seu nome e o valor! ❤️");
                return;
            }

            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i data-feather="loader" class="animate-spin w-4 h-4 mx-auto"></i>';
            feather.replace();

            try {
                // Envio com no-cors
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

                // DESBLOQUEIA A ÁREA DO PIX
                const paymentArea = document.getElementById('pixPaymentArea');
                if (paymentArea) paymentArea.classList.remove('opacity-20', 'pointer-events-none', 'grayscale');
                
                // Transforma o botão para permitir FECHAR o modal
                confirmBtn.disabled = false;
                confirmBtn.classList.remove('bg-green-500');
                confirmBtn.classList.add('bg-gray-800');
                confirmBtn.innerHTML = '<i data-feather="check-circle" class="w-4 h-4 inline mr-2"></i> Concluir e Fechar';
                feather.replace();

                // Define a nova função do botão: FECHAR
                confirmBtn.onclick = () => fecharModal();

                alert(`Obrigado, ${nomeDoador}! Agora você já pode ver os dados do PIX.`);

            } catch (error) {
                alert("Erro de conexão. Tente novamente.");
                confirmBtn.disabled = false;
                confirmBtn.innerText = "Confirmar e Ver PIX";
            }
        });
    }

    // --- 5. FECHAMENTO E UTILITÁRIOS ---
    const pixModal = document.getElementById('pixModal');
    const fecharModal = () => {
        if(pixModal) {
            pixModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                pixModal.classList.add('hidden');
                // Recarrega para atualizar as barras de progresso no site
                location.reload(); 
            }, 300);
        }
    };

    const closePixModalBtn = document.getElementById('closePixModal');
    if (closePixModalBtn) closePixModalBtn.addEventListener('click', fecharModal);
    if (pixModal) pixModal.addEventListener('click', (e) => { if (e.target === pixModal) fecharModal(); });

    // Copiar PIX
    const copyPixBtn = document.getElementById('copyPixBtn');
    const pixKeyElement = document.getElementById('pixKey');
    if (pixKeyElement) pixKeyElement.textContent = pixKeyValue;
    
    if (copyPixBtn) {
        copyPixBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(pixKeyValue).then(() => {
                const originalIcon = copyPixBtn.innerHTML;
                copyPixBtn.innerHTML = '<i data-feather="check" class="w-4 h-4 text-green-500"></i>';
                feather.replace();
                setTimeout(() => { copyPixBtn.innerHTML = originalIcon; feather.replace(); }, 2000);
            });
        });
    }

    // QR Code
    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrCodeImg) qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixKeyValue)}`;

    // Countdown e Outros (Mantenha o resto como estava)
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            return;
        }
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

    // Música
    if (siteMusic) {
        const playMusic = () => { siteMusic.play().catch(() => {}); };
        document.addEventListener('click', playMusic, {once: true});
    }

    carregarPresentes();
    feather.replace();
});

function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);