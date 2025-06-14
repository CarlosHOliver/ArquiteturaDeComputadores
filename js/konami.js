/*
 * Easter Egg - Código Konami
 * Desenvolvido por Carlos Henrique
 * Detecta a sequência clássica do Código Konami e mostra uma surpresa
 */

// Sequência clássica do Código Konami
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Variáveis para controle do easter egg
let userSequence = [];
let konamiTimeout = null;
let easterEggActivated = false;

// Elementos DOM
const easterEggModal = document.getElementById('easterEggModal');

/**
 * Inicializa o detector do Código Konami
 */
function initKonamiCode() {
    console.log('🎮 Código Konami ativado! Sequência:', KONAMI_CODE.join(' '));
    
    document.addEventListener('keydown', handleKonamiInput);
    
    // Adiciona suporte para dispositivos móveis (toque)
    setupMobileKonamiSupport();
}

/**
 * Manipula a entrada de teclas para o Código Konami
 */
function handleKonamiInput(event) {
    // Ignora se o easter egg já foi ativado
    if (easterEggActivated) return;
    
    // Ignora se o usuário está digitando em um campo de entrada
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    const keyPressed = event.code;
    
    // Verifica se a tecla pressionada é parte da sequência
    if (KONAMI_CODE.includes(keyPressed)) {
        // Adiciona a tecla à sequência do usuário
        userSequence.push(keyPressed);
        
        console.log('🎮 Tecla Konami detectada:', keyPressed, '| Sequência atual:', userSequence);
        
        // Verifica se a sequência está correta até agora
        if (isSequenceCorrect()) {
            // Se a sequência está completa
            if (userSequence.length === KONAMI_CODE.length) {
                activateEasterEgg();
            } else {
                // Reseta o timeout para permitir mais tempo entre as teclas
                resetKonamiTimeout();
            }
        } else {
            // Sequência incorreta, reseta
            resetUserSequence();
        }
    } else {
        // Tecla não faz parte da sequência, reseta
        resetUserSequence();
    }
}

/**
 * Verifica se a sequência atual do usuário está correta
 */
function isSequenceCorrect() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== KONAMI_CODE[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Reseta a sequência do usuário
 */
function resetUserSequence() {
    if (userSequence.length > 0) {
        console.log('🎮 Sequência Konami resetada');
        userSequence = [];
    }
    clearKonamiTimeout();
}

/**
 * Reseta o timeout do Konami
 */
function resetKonamiTimeout() {
    clearKonamiTimeout();
    
    // Define um timeout de 3 segundos entre as teclas
    konamiTimeout = setTimeout(() => {
        console.log('🎮 Timeout da sequência Konami');
        resetUserSequence();
    }, 3000);
}

/**
 * Limpa o timeout do Konami
 */
function clearKonamiTimeout() {
    if (konamiTimeout) {
        clearTimeout(konamiTimeout);
        konamiTimeout = null;
    }
}

/**
 * Ativa o easter egg
 */
function activateEasterEgg() {
    console.log('🎉 EASTER EGG ATIVADO! Código Konami detectado!');
    
    easterEggActivated = true;
    resetUserSequence();
    
    // Adiciona efeitos visuais
    addEasterEggEffects();
    
    // Mostra o modal do easter egg
    showEasterEggModal();
    
    // Salva no localStorage que o easter egg foi descoberto
    saveEasterEggDiscovery();
    
    // Adiciona confetes na tela
    createConfetti();
}

/**
 * Adiciona efeitos visuais quando o easter egg é ativado
 */
function addEasterEggEffects() {
    // Adiciona uma classe especial ao body para efeitos CSS
    document.body.classList.add('easter-egg-active');
    
    // Remove a classe após alguns segundos
    setTimeout(() => {
        document.body.classList.remove('easter-egg-active');
    }, 5000);
    
    // Adiciona um efeito de shake na tela
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

/**
 * Mostra o modal do easter egg
 */
function showEasterEggModal() {
    if (!easterEggModal) {
        console.error('Modal do easter egg não encontrado');
        return;
    }
    
    // Adiciona animação especial ao modal
    easterEggModal.classList.add('easter-egg-animation');
    
    // Mostra o modal
    const modal = new bootstrap.Modal(easterEggModal);
    modal.show();
    
    // Remove a animação após ser mostrado
    easterEggModal.addEventListener('shown.bs.modal', () => {
        easterEggModal.classList.remove('easter-egg-animation');
    });
    
    // Permite ativar o easter egg novamente após fechar o modal
    easterEggModal.addEventListener('hidden.bs.modal', () => {
        setTimeout(() => {
            easterEggActivated = false;
            console.log('🎮 Easter egg pode ser ativado novamente');
        }, 5000); // 5 segundos de cooldown
    });
}

/**
 * Salva no localStorage que o easter egg foi descoberto
 */
function saveEasterEggDiscovery() {
    try {
        const discoveries = JSON.parse(localStorage.getItem('easterEggDiscoveries') || '[]');
        const timestamp = new Date().toISOString();
        
        discoveries.push({
            timestamp: timestamp,
            type: 'konami_code',
            userAgent: navigator.userAgent
        });
        
        localStorage.setItem('easterEggDiscoveries', JSON.stringify(discoveries));
        
        console.log('🎉 Descoberta do easter egg salva:', timestamp);
        
    } catch (error) {
        console.error('Erro ao salvar descoberta do easter egg:', error);
    }
}

/**
 * Cria efeito de confetes na tela
 */
function createConfetti() {
    const colors = ['#08e38d', '#06b36f', '#4aed9f', '#2c3e50', '#f39c12', '#e74c3c'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createSingleConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 50);
    }
}

/**
 * Cria um único confete
 */
function createSingleConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: 10px;
        height: 10px;
        background-color: ${color};
        z-index: 9999;
        pointer-events: none;
        border-radius: 50%;
        animation: confetti-fall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    // Remove o confete após a animação
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 3000);
}

/**
 * Configura suporte para dispositivos móveis
 */
function setupMobileKonamiSupport() {
    let touchSequence = [];
    let touchStartTime = null;
    
    // Detecta gestos de toque para simular as setas
    document.addEventListener('touchstart', (event) => {
        touchStartTime = Date.now();
    });
    
    document.addEventListener('touchend', (event) => {
        if (!touchStartTime) return;
        
        const touchDuration = Date.now() - touchStartTime;
        
        // Ignora toques muito longos (provavelmente não são gestos)
        if (touchDuration > 500) return;
        
        // Para dispositivos móveis, vamos usar uma sequência simplificada
        // Toque rápido = próximo passo da sequência
        touchSequence.push('touch');
        
        if (touchSequence.length >= 10) {
            // 10 toques rápidos ativam o easter egg no mobile
            activateEasterEgg();
            touchSequence = [];
        }
        
        // Reseta a sequência após 2 segundos sem toques
        setTimeout(() => {
            touchSequence = [];
        }, 2000);
    });
}

/**
 * Adiciona estilos CSS para as animações do easter egg
 */
function addEasterEggStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .easter-egg-animation {
            animation: bounce 0.6s ease-in-out;
        }
        
        .easter-egg-active {
            position: relative;
        }
        
        .easter-egg-active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, 
                rgba(8, 227, 141, 0.1) 0%, 
                rgba(6, 179, 111, 0.1) 50%, 
                rgba(74, 237, 159, 0.1) 100%);
            pointer-events: none;
            z-index: 9998;
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Inicializa o easter egg quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Inicializando Easter Egg - Código Konami');
    
    // Adiciona os estilos CSS
    addEasterEggStyles();
    
    // Inicializa o detector do Código Konami
    initKonamiCode();
    
    // Adiciona dica sutil no console para desenvolvedores curiosos
    console.log('%c🎮 Dica: Que tal tentar o famoso código dos videogames? ↑↑↓↓←→←→BA', 
                'color: #08e38d; font-size: 14px; font-weight: bold;');
});

// Expõe funções para debug (apenas em desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugKonami = {
        activate: activateEasterEgg,
        reset: resetUserSequence,
        sequence: KONAMI_CODE,
        current: () => userSequence
    };
    
    console.log('🔧 Modo debug ativo. Use window.debugKonami para testar o easter egg.');
}

