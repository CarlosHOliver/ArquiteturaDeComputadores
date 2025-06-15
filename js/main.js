/*
 * JavaScript principal para o Material de Apoio de Arquitetura de Computadores
 * Desenvolvido por Carlos Henrique
 * Gerencia navegação, carregamento de conteúdo e interações
 */

// Variáveis globais
let aulasData = [];
let currentAula = null;
let currentTopic = null;

// Elementos DOM
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const welcomeSection = document.getElementById('welcomeSection');
const contentSection = document.getElementById('contentSection');
const aulasList = document.getElementById('aulasList');
const aulaContent = document.getElementById('aulaContent');
const breadcrumb = document.getElementById('breadcrumb');

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Material de Apoio de Arquitetura de Computadores');
    
    // Carrega os dados das aulas
    loadAulasData();
    
    // Configura eventos
    setupEventListeners();
    
    // Configura responsividade
    setupResponsiveHandlers();
    
    console.log('✅ Inicialização concluída');
});

/**
 * Carrega os dados das aulas do arquivo JSON
 */
async function loadAulasData() {
    try {
        console.log('📚 Carregando dados das aulas...');
        const response = await fetch('data/aulas_data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        aulasData = await response.json();
        console.log(`✅ ${aulasData.length} aulas carregadas com sucesso`);
        
        // Renderiza a lista de aulas na sidebar
        renderAulasList();
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados das aulas:', error);
        showError('Erro ao carregar o conteúdo das aulas. Tente recarregar a página.');
    }
}

/**
 * Renderiza a lista de aulas na sidebar
 */
function renderAulasList() {
    if (!aulasList || !aulasData.length) return;
    
    console.log('🎨 Renderizando lista de aulas...');
    
    aulasList.innerHTML = '';
    
    aulasData.forEach(aula => {
        const aulaItem = createAulaItem(aula);
        aulasList.appendChild(aulaItem);
    });
    
    console.log('✅ Lista de aulas renderizada');
}

/**
 * Cria um item de aula para a sidebar
 */
function createAulaItem(aula) {
    const aulaItem = document.createElement('div');
    aulaItem.className = 'aula-item';
    aulaItem.innerHTML = `
        <button class="aula-header" 
                data-aula-id="${aula.id}" 
                aria-expanded="false"
                onclick="toggleAula(${aula.id})">
            <span class="aula-number">${aula.id.toString().padStart(2, '0')}</span>
            <span class="aula-title">${aula.title}</span>
            <i class="fas fa-chevron-down aula-toggle"></i>
        </button>
        <div class="collapse topics-list" id="topics-${aula.id}">
            ${aula.topics.map((topic, index) => `
                <div class="topic-item" 
                     data-aula-id="${aula.id}" 
                     data-topic-index="${index}"
                     onclick="loadTopic(${aula.id}, ${index})">
                    <i class="fas fa-bookmark me-2"></i>
                    ${topic.title}
                </div>
            `).join('')}
            <div class="topic-item quiz-topic" 
                 data-aula-id="${aula.id}"
                 onclick="openQuiz(${aula.id})">
                <i class="fas fa-question-circle me-2"></i>
                Quiz da Aula
            </div>
        </div>
    `;
    
    return aulaItem;
}

/**
 * Alterna a expansão/colapso de uma aula na sidebar
 */
function toggleAula(aulaId) {
    const aulaHeader = document.querySelector(`[data-aula-id="${aulaId}"]`);
    const topicsList = document.getElementById(`topics-${aulaId}`);
    
    if (!aulaHeader || !topicsList) return;
    
    const isExpanded = aulaHeader.getAttribute('aria-expanded') === 'true';
    
    // Fecha todas as outras aulas
    document.querySelectorAll('.aula-header').forEach(header => {
        header.setAttribute('aria-expanded', 'false');
        header.classList.remove('active');
    });
    
    document.querySelectorAll('.topics-list').forEach(list => {
        list.classList.remove('show');
    });
    
    // Alterna a aula atual
    if (!isExpanded) {
        aulaHeader.setAttribute('aria-expanded', 'true');
        aulaHeader.classList.add('active');
        topicsList.classList.add('show');
        
        // Carrega o primeiro tópico da aula
        loadTopic(aulaId, 0);
    }
}

/**
 * Carrega um tópico específico de uma aula
 */
function loadTopic(aulaId, topicIndex) {
    const aula = aulasData.find(a => a.id === aulaId);
    if (!aula || !aula.topics[topicIndex]) return;
    
    console.log(`📖 Carregando Aula ${aulaId}, Tópico ${topicIndex}`);
    
    currentAula = aula;
    currentTopic = aula.topics[topicIndex];
    
    // Atualiza interface
    updateActiveStates(aulaId, topicIndex);
    renderAulaContent(aula, topicIndex);
    updateBreadcrumb(aula, currentTopic);
    showContentSection();
}

/**
 * Atualiza os estados ativos na sidebar
 */
function updateActiveStates(aulaId, topicIndex) {
    // Remove estados ativos anteriores
    document.querySelectorAll('.topic-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adiciona estado ativo ao tópico atual
    const activeTopicItem = document.querySelector(
        `[data-aula-id="${aulaId}"][data-topic-index="${topicIndex}"]`
    );
    if (activeTopicItem) {
        activeTopicItem.classList.add('active');
    }
}

/**
 * Renderiza o conteúdo de uma aula
 */
function renderAulaContent(aula, topicIndex) {
    if (!aulaContent) return;
    
    const topic = aula.topics[topicIndex];
    
    aulaContent.innerHTML = `
        <div class="aula-header-content">
            <div class="aula-number-large">${aula.id.toString().padStart(2, '0')}</div>
            <h1 class="aula-title-large">${aula.title}</h1>
        </div>
        
        <div class="topic-content">
            <h2 class="topic-title">
                <i class="fas fa-bookmark"></i>
                ${topic.title}
            </h2>
            <div class="topic-text">
                ${formatTopicContent(topic.content)}
            </div>
        </div>
    `;
    
    // Adiciona animação
    aulaContent.classList.add('fade-in');
    setTimeout(() => aulaContent.classList.remove('fade-in'), 500);
}

/**
 * Formata o conteúdo do tópico para exibição
 */
function formatTopicContent(content) {
    // Primeiro, converte Markdown para HTML
    let htmlContent = parseMarkdown(content);
    
    // Quebra o conteúdo em parágrafos se ainda não estiver formatado
    if (!htmlContent.includes('<p>')) {
        const paragraphs = htmlContent.split('\n\n').filter(p => p.trim().length > 0);
        htmlContent = paragraphs.map(paragraph => {
            let cleanParagraph = paragraph.trim();
            return `<p>${cleanParagraph}</p>`;
        }).join('');
    }
    
    return htmlContent;
}

/**
 * Converte marcações Markdown básicas para HTML
 */
function parseMarkdown(text) {
    if (!text) return '';
    
    // Converte negrito (**texto** ou __texto__)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Converte itálico (*texto* ou _texto_)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Converte código inline (`código`)
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Converte links [texto](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Converte quebras de linha duplas em parágrafos
    text = text.replace(/\n\n/g, '</p><p>');
    
    // Converte quebras de linha simples em <br>
    text = text.replace(/\n/g, '<br>');
    
    // Converte títulos ### para h3
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Converte títulos ## para h2  
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    
    // Converte títulos # para h1
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Converte listas não ordenadas
    text = text.replace(/^\* (.*$)/gm, '<li>$1</li>');
    text = text.replace(/^- (.*$)/gm, '<li>$1</li>');
    
    // Envolve listas em <ul>
    text = text.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    return text;
}

/**
 * Atualiza o breadcrumb
 */
function updateBreadcrumb(aula, topic) {
    if (!breadcrumb) return;
    
    breadcrumb.innerHTML = `
        <li class="breadcrumb-item">
            <a href="#" onclick="showWelcome()">Início</a>
        </li>
        <li class="breadcrumb-item">
            <a href="#" onclick="loadTopic(${aula.id}, 0)">Aula ${aula.id}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
            ${topic.title}
        </li>
    `;
}

/**
 * Mostra a seção de conteúdo e esconde a seção de boas-vindas
 */
function showContentSection() {
    if (welcomeSection) welcomeSection.style.display = 'none';
    if (contentSection) contentSection.style.display = 'block';
}

/**
 * Mostra a seção de boas-vindas e esconde a seção de conteúdo
 */
function showWelcome() {
    if (contentSection) contentSection.style.display = 'none';
    if (welcomeSection) welcomeSection.style.display = 'block';
    
    // Remove estados ativos
    document.querySelectorAll('.aula-header').forEach(header => {
        header.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
    });
    
    document.querySelectorAll('.topics-list').forEach(list => {
        list.classList.remove('show');
    });
    
    document.querySelectorAll('.topic-item').forEach(item => {
        item.classList.remove('active');
    });
    
    currentAula = null;
    currentTopic = null;
}

/**
 * Inicia o estudo (chamado pelo botão "Começar a Estudar")
 */
function startStudying() {
    console.log('🎓 Iniciando estudos...');
    
    // Abre a sidebar se estiver fechada
    if (!sidebar.classList.contains('show')) {
        toggleSidebar();
    }
    
    // Carrega a primeira aula
    if (aulasData.length > 0) {
        toggleAula(1);
    }
}

/**
 * Alterna a visibilidade da sidebar
 */
function toggleSidebar() {
    sidebar.classList.toggle('show');
    
    // Adiciona/remove classe para ajustar o conteúdo principal
    if (sidebar.classList.contains('show')) {
        mainContent.style.marginLeft = getComputedStyle(document.documentElement)
            .getPropertyValue('--sidebar-width');
    } else {
        mainContent.style.marginLeft = '0';
    }
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    // Toggle da sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Fecha sidebar ao clicar fora (mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && 
                !sidebarToggle.contains(event.target) && 
                sidebar.classList.contains('show')) {
                toggleSidebar();
            }
        }
    });
    
    // Teclas de atalho
    document.addEventListener('keydown', function(event) {
        // ESC para fechar sidebar
        if (event.key === 'Escape' && sidebar.classList.contains('show')) {
            toggleSidebar();
        }
        
        // Ctrl + H para mostrar/esconder sidebar
        if (event.ctrlKey && event.key === 'h') {
            event.preventDefault();
            toggleSidebar();
        }
    });
}

/**
 * Configura handlers para responsividade
 */
function setupResponsiveHandlers() {
    // Ajusta sidebar baseado no tamanho da tela
    function handleResize() {
        if (window.innerWidth > 768) {
            // Desktop: sidebar pode ficar aberta
            if (currentAula) {
                sidebar.classList.add('show');
                mainContent.style.marginLeft = getComputedStyle(document.documentElement)
                    .getPropertyValue('--sidebar-width');
            }
        } else {
            // Mobile: sidebar sempre fechada inicialmente
            sidebar.classList.remove('show');
            mainContent.style.marginLeft = '0';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Executa uma vez no carregamento
}

/**
 * Mostra uma mensagem de erro
 */
function showError(message) {
    console.error('❌ Erro:', message);
    
    // Cria um toast de erro
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-danger border-0';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                    data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Adiciona o toast ao body
    document.body.appendChild(toast);
    
    // Mostra o toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove o toast após ser escondido
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

/**
 * Utilitário para debug
 */
function debug() {
    console.log('🔍 Debug Info:');
    console.log('- Aulas carregadas:', aulasData.length);
    console.log('- Aula atual:', currentAula?.id);
    console.log('- Tópico atual:', currentTopic?.title);
    console.log('- Sidebar visível:', sidebar.classList.contains('show'));
}

// Expõe funções globais necessárias
window.toggleAula = toggleAula;
window.loadTopic = loadTopic;
window.showWelcome = showWelcome;
window.startStudying = startStudying;
window.debug = debug;

