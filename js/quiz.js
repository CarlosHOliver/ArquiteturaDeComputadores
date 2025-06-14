/*
 * Sistema de Quiz Interativo
 * Desenvolvido por Carlos Henrique
 * Gerencia quizzes, pontuação e compartilhamento social
 */

// Variáveis do quiz
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let quizStartTime = null;

// Elementos DOM do quiz
let quizModal, quizContent;

// Inicializa elementos DOM quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    quizModal = document.getElementById('quizModal');
    quizContent = document.getElementById('quizContent');
});

/**
 * Abre o quiz de uma aula específica
 */
function openQuiz(aulaId) {
    const aula = aulasData.find(a => a.id === aulaId);
    if (!aula || !aula.quiz) {
        showError('Quiz não encontrado para esta aula.');
        return;
    }
    
    console.log(`🎯 Abrindo quiz da Aula ${aulaId}`);
    
    // Inicializa o quiz
    currentQuiz = {
        questions: aula.quiz,
        title: aula.title
    };
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    quizStartTime = new Date();
    
    // Atualiza o título do modal
    document.getElementById('quizModalLabel').innerHTML = `
        <i class="fas fa-quiz me-2"></i>
        Quiz - Aula ${aulaId}: ${aula.title}
    `;
    
    // Renderiza a primeira questão
    renderQuizQuestion();
    
    // Mostra o modal
    const modal = new bootstrap.Modal(quizModal);
    modal.show();
}

/**
 * Renderiza uma questão do quiz
 */
function renderQuizQuestion() {
    if (!currentQuiz || !quizContent) return;
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const totalQuestions = currentQuiz.questions.length;
    const questionNumber = currentQuestionIndex + 1;
    
    quizContent.innerHTML = `
        <div class="quiz-progress mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted">Questão ${questionNumber} de ${totalQuestions}</span>
                <span class="badge bg-primary">${Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
            <div class="progress">
                <div class="progress-bar bg-primary" 
                     style="width: ${(questionNumber / totalQuestions) * 100}%"></div>
            </div>
        </div>
        
        <div class="quiz-question">
            <h5 class="mb-3">${question.question}</h5>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" 
                            data-option-index="${index}"
                            onclick="selectQuizOption(${index})">
                        <span class="option-letter">${String.fromCharCode(65 + index)})</span>
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-actions mt-4 d-flex justify-content-between">
            <button class="btn btn-outline-secondary" 
                    onclick="previousQuestion()" 
                    ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                <i class="fas fa-arrow-left me-2"></i>
                Anterior
            </button>
            
            <button class="btn btn-primary" 
                    id="nextQuestionBtn"
                    onclick="nextQuestion()" 
                    disabled>
                ${currentQuestionIndex === totalQuestions - 1 ? 'Finalizar Quiz' : 'Próxima'}
                <i class="fas fa-arrow-right ms-2"></i>
            </button>
        </div>
    `;
    
    // Restaura resposta anterior se existir
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const selectedOption = document.querySelector(`[data-option-index="${userAnswers[currentQuestionIndex]}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
            document.getElementById('nextQuestionBtn').disabled = false;
        }
    }
}

/**
 * Seleciona uma opção do quiz
 */
function selectQuizOption(optionIndex) {
    // Remove seleção anterior
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adiciona seleção atual
    const selectedOption = document.querySelector(`[data-option-index="${optionIndex}"]`);
    selectedOption.classList.add('selected');
    
    // Salva a resposta
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Habilita botão de próxima questão
    document.getElementById('nextQuestionBtn').disabled = false;
}

/**
 * Vai para a próxima questão
 */
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === undefined) {
        showError('Por favor, selecione uma resposta antes de continuar.');
        return;
    }
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        renderQuizQuestion();
    } else {
        finishQuiz();
    }
}

/**
 * Volta para a questão anterior
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuizQuestion();
    }
}

/**
 * Finaliza o quiz e mostra os resultados
 */
function finishQuiz() {
    console.log('🏁 Finalizando quiz...');
    
    // Calcula a pontuação
    calculateQuizScore();
    
    // Calcula o tempo gasto
    const quizEndTime = new Date();
    const timeSpent = Math.round((quizEndTime - quizStartTime) / 1000); // em segundos
    
    // Renderiza os resultados
    renderQuizResults(timeSpent);
    
    // Salva estatísticas localmente
    saveQuizStats();
}

/**
 * Calcula a pontuação do quiz
 */
function calculateQuizScore() {
    quizScore = 0;
    
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            quizScore++;
        }
    });
}

/**
 * Renderiza os resultados do quiz
 */
function renderQuizResults(timeSpent) {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const timeFormatted = formatTime(timeSpent);
    
    // Determina a mensagem baseada na performance
    let performanceMessage = '';
    let performanceClass = '';
    
    if (percentage >= 90) {
        performanceMessage = '🏆 Excelente! Você domina o assunto!';
        performanceClass = 'text-success';
    } else if (percentage >= 70) {
        performanceMessage = '👍 Muito bom! Continue assim!';
        performanceClass = 'text-primary';
    } else if (percentage >= 50) {
        performanceMessage = '📚 Bom trabalho! Revise alguns pontos.';
        performanceClass = 'text-warning';
    } else {
        performanceMessage = '💪 Continue estudando! Você vai conseguir!';
        performanceClass = 'text-danger';
    }
    
    quizContent.innerHTML = `
        <div class="quiz-results text-center">
            <div class="result-icon mb-3">
                <i class="fas fa-trophy" style="font-size: 3rem; color: var(--primary-color);"></i>
            </div>
            
            <h4 class="mb-3">Quiz Concluído!</h4>
            
            <div class="score-display mb-4">
                <div class="score-circle">
                    <span class="score-percentage">${percentage}%</span>
                    <span class="score-fraction">${quizScore}/${totalQuestions}</span>
                </div>
            </div>
            
            <p class="${performanceClass} fw-bold mb-3">${performanceMessage}</p>
            
            <div class="quiz-stats mb-4">
                <div class="row text-center">
                    <div class="col-4">
                        <div class="stat-item">
                            <div class="stat-value">${quizScore}</div>
                            <div class="stat-label">Acertos</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="stat-item">
                            <div class="stat-value">${totalQuestions - quizScore}</div>
                            <div class="stat-label">Erros</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="stat-item">
                            <div class="stat-value">${timeFormatted}</div>
                            <div class="stat-label">Tempo</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="quiz-actions">
                <button class="btn btn-outline-primary me-2" onclick="reviewQuizAnswers()">
                    <i class="fas fa-eye me-2"></i>
                    Revisar Respostas
                </button>
                
                <button class="btn btn-success" onclick="shareQuizResult()">
                    <i class="fas fa-share me-2"></i>
                    Compartilhar Resultado
                </button>
            </div>
        </div>
    `;
}

/**
 * Mostra a revisão das respostas do quiz
 */
function reviewQuizAnswers() {
    quizContent.innerHTML = `
        <div class="quiz-review">
            <h5 class="mb-4">
                <i class="fas fa-eye me-2"></i>
                Revisão das Respostas
            </h5>
            
            ${currentQuiz.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                return `
                    <div class="review-question mb-4">
                        <h6 class="question-title">
                            ${index + 1}. ${question.question}
                        </h6>
                        
                        <div class="review-options">
                            ${question.options.map((option, optionIndex) => {
                                let optionClass = '';
                                let optionIcon = '';
                                
                                if (optionIndex === question.correct) {
                                    optionClass = 'correct';
                                    optionIcon = '<i class="fas fa-check"></i>';
                                } else if (optionIndex === userAnswer && !isCorrect) {
                                    optionClass = 'incorrect';
                                    optionIcon = '<i class="fas fa-times"></i>';
                                }
                                
                                return `
                                    <div class="review-option ${optionClass}">
                                        <span class="option-letter">${String.fromCharCode(65 + optionIndex)})</span>
                                        ${option}
                                        ${optionIcon}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <div class="review-result ${isCorrect ? 'text-success' : 'text-danger'}">
                            ${isCorrect ? '✅ Resposta correta!' : '❌ Resposta incorreta'}
                        </div>
                    </div>
                `;
            }).join('')}
            
            <div class="text-center mt-4">
                <button class="btn btn-primary" onclick="renderQuizResults(0)">
                    <i class="fas fa-arrow-left me-2"></i>
                    Voltar aos Resultados
                </button>
            </div>
        </div>
    `;
}

/**
 * Compartilha o resultado do quiz
 */
function shareQuizResult() {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const aulaTitle = currentAula ? currentAula.title : 'Arquitetura de Computadores';
    
    const shareText = `🎓 Acabei de fazer um quiz sobre "${aulaTitle}" e acertei ${quizScore}/${totalQuestions} questões (${percentage}%)! 
    
📚 Material de Apoio: Arquitetura de Computadores do Séc. XXI
👨‍💻 Desenvolvido por Carlos Henrique

#ArquiteturaDeComputadores #Estudos #Quiz #EngenhariaDaComputacao`;

    const shareUrl = window.location.href;
    
    quizContent.innerHTML = `
        <div class="share-quiz-result text-center">
            <h5 class="mb-4">
                <i class="fas fa-share me-2"></i>
                Compartilhar Resultado
            </h5>
            
            <div class="share-preview mb-4 p-3 bg-light rounded">
                <p class="mb-0">${shareText.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="share-buttons">
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Quiz de Arquitetura de Computadores')}&summary=${encodeURIComponent(shareText)}" 
                   target="_blank" 
                   class="share-btn linkedin">
                    <i class="fab fa-linkedin me-2"></i>
                    LinkedIn
                </a>
                
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}" 
                   target="_blank" 
                   class="share-btn twitter">
                    <i class="fab fa-twitter me-2"></i>
                    Twitter
                </a>
                
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}" 
                   target="_blank" 
                   class="share-btn facebook">
                    <i class="fab fa-facebook me-2"></i>
                    Facebook
                </a>
                
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}" 
                   target="_blank" 
                   class="share-btn whatsapp">
                    <i class="fab fa-whatsapp me-2"></i>
                    WhatsApp
                </a>
            </div>
            
            <div class="mt-4">
                <button class="btn btn-outline-primary me-2" onclick="copyShareText()">
                    <i class="fas fa-copy me-2"></i>
                    Copiar Texto
                </button>
                
                <button class="btn btn-primary" onclick="renderQuizResults(0)">
                    <i class="fas fa-arrow-left me-2"></i>
                    Voltar aos Resultados
                </button>
            </div>
        </div>
    `;
}

/**
 * Copia o texto de compartilhamento para a área de transferência
 */
async function copyShareText() {
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const aulaTitle = currentAula ? currentAula.title : 'Arquitetura de Computadores';
    
    const shareText = `🎓 Acabei de fazer um quiz sobre "${aulaTitle}" e acertei ${quizScore}/${totalQuestions} questões (${percentage}%)! 

📚 Material de Apoio: Arquitetura de Computadores do Séc. XXI
👨‍💻 Desenvolvido por Carlos Henrique

#ArquiteturaDeComputadores #Estudos #Quiz #EngenhariaDaComputacao

${window.location.href}`;

    try {
        await navigator.clipboard.writeText(shareText);
        
        // Mostra feedback visual
        const copyBtn = document.querySelector('button[onclick="copyShareText()"]');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copiado!';
        copyBtn.classList.add('btn-success');
        copyBtn.classList.remove('btn-outline-primary');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('btn-success');
            copyBtn.classList.add('btn-outline-primary');
        }, 2000);
        
    } catch (err) {
        console.error('Erro ao copiar texto:', err);
        showError('Não foi possível copiar o texto. Tente selecionar e copiar manualmente.');
    }
}

/**
 * Salva estatísticas do quiz no localStorage
 */
function saveQuizStats() {
    try {
        const stats = JSON.parse(localStorage.getItem('quizStats') || '{}');
        const aulaId = currentAula ? currentAula.id : 'unknown';
        
        if (!stats[aulaId]) {
            stats[aulaId] = {
                attempts: 0,
                bestScore: 0,
                totalTime: 0,
                averageScore: 0
            };
        }
        
        const aulaStats = stats[aulaId];
        aulaStats.attempts++;
        aulaStats.bestScore = Math.max(aulaStats.bestScore, quizScore);
        aulaStats.totalTime += Math.round((new Date() - quizStartTime) / 1000);
        
        // Calcula média simples (pode ser melhorada)
        aulaStats.averageScore = Math.round(
            ((aulaStats.averageScore * (aulaStats.attempts - 1)) + quizScore) / aulaStats.attempts
        );
        
        localStorage.setItem('quizStats', JSON.stringify(stats));
        
        console.log('📊 Estatísticas do quiz salvas:', aulaStats);
        
    } catch (error) {
        console.error('Erro ao salvar estatísticas:', error);
    }
}

/**
 * Formata tempo em segundos para formato legível
 */
function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }
}

// Expõe funções globais necessárias
window.openQuiz = openQuiz;
window.selectQuizOption = selectQuizOption;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.reviewQuizAnswers = reviewQuizAnswers;
window.shareQuizResult = shareQuizResult;
window.copyShareText = copyShareText;

