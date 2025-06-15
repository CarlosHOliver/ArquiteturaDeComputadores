# 🎓 Material de Apoio - Arquitetura de Computadores (VERSÃO CORRIGIDA)

## ✅ **Problemas Corrigidos Nesta Versão:**

### 1. **Renderização de Markdown** ✅
- **Problema:** Marcações `**texto**` apareciam literalmente na tela
- **Solução:** Implementada função `parseMarkdown()` no JavaScript
- **Resultado:** Textos em negrito agora aparecem corretamente formatados

### 2. **Sistema de Quiz** ✅
- **Problema:** Modal do quiz não abria, erro "Quiz não encontrado"
- **Solução:** Corrigida estrutura de dados e inicialização dos elementos DOM
- **Resultado:** Quiz funciona perfeitamente com 10 questões por aula

### 3. **Favicon 404** ✅
- **Problema:** Erro 404 ao carregar favicon
- **Solução:** Criado favicon.ico com emoji 🎓
- **Resultado:** Sem mais erros no console

---

## 🎯 **Site de Material de Apoio Didático - Arquitetura de Computadores**

Este é um material de apoio interativo para a disciplina de **Arquitetura de Computadores do Século XXI**, desenvolvido especificamente para auxiliar os estudantes na revisão e fixação do conteúdo.

## 🚀 **Características Principais**

### **📚 Conteúdo Didático Expandido**
- **16 aulas completas** com conteúdo pesquisado e expandido
- **Linguagem simples e didática** como se fosse para crianças
- **Textos bem formatados** sem quebras de linha indevidas
- **Analogias e exemplos** do dia a dia para facilitar o entendimento

### **🎨 Design e Interface**
- **Menu lateral dinâmico** com estrutura hierárquica
- **Navegação intuitiva** entre aulas e tópicos
- **Design responsivo** para desktop, tablet e mobile
- **Paleta de cores #08e38d** conforme solicitado
- **Seções recolhíveis** para melhor organização

### **🎯 Sistema de Quiz Interativo**
- **160 questões** (10 por aula) com múltipla escolha
- **Sistema de pontuação** em tempo real
- **Barra de progresso** visual
- **Navegação entre questões** (anterior/próxima)
- **Compartilhamento social** dos resultados

### **🎮 Easter Egg**
- **Código Konami** implementado: ↑↑↓↓←→←→BA
- **Mensagem personalizada** com link para LinkedIn
- **Efeitos visuais** com confetes e animações

## 📁 **Estrutura do Projeto**

```
arquitetura-computadores-site/
├── index.html                 # Página principal
├── favicon.ico                # Ícone do site
├── README.md                  # Documentação
├── css/
│   └── style.css             # Estilos principais
├── js/
│   ├── main.js               # JavaScript principal
│   ├── quiz.js               # Sistema de quiz
│   └── konami.js             # Easter egg
├── data/
│   ├── aulas_data.json       # Dados das aulas e quizzes
│   └── aulas/                # Arquivos markdown das aulas
│       ├── aula1.md
│       ├── aula2.md
│       └── ... (até aula16.md)
└── images/                   # Pasta para imagens (vazia)
```

## 🎓 **Conteúdo das Aulas**

1. **Aula 1:** Uma Aventura no Mundo dos Computadores
2. **Aula 2:** Os Segredos dos Números no Computador
3. **Aula 3:** As Receitas Mágicas do Computador: Algoritmos
4. **Aula 4:** Conversando com o Computador: Linguagens de Programação
5. **Aula 5:** Escondendo os Detalhes: A Mágica da Abstração de Dados
6. **Aula 6:** Construindo Programas Incríveis: A Engenharia de Software
7. **Aula 7:** O Maestro do Computador: Sistemas Operacionais
8. **Aula 8:** Conectando o Mundo: Redes de Computadores
9. **Aula 9:** Os Pequenos Gênios Elétricos: Circuitos Lógicos
10. **Aula 10:** Caçando Tesouros de Informação: Mineração de Dados
11. **Aula 11:** O Grande Cofre de Informações: Banco de Dados
12. **Aula 12:** Protegendo Nossos Segredos Digitais: Segurança da Informação
13. **Aula 13:** Criando Coisas que as Pessoas Amam: Usabilidade e UX
14. **Aula 14:** Desenhando com o Computador: Computação Gráfica
15. **Aula 15:** Organizando o Conhecimento: Sistemas de Informação
16. **Aula 16:** Os Grandes Pensadores da Computação: Teoria da Computação

## 🚀 **Como Usar**

### **Para GitHub Pages (Recomendado):**
1. Extraia o arquivo ZIP
2. Crie um novo repositório no GitHub
3. Faça upload de todos os arquivos para o repositório
4. Vá em **Settings** > **Pages**
5. Selecione **Source: Deploy from a branch**
6. Escolha **Branch: main** e **Folder: / (root)**
7. Clique em **Save**
8. Aguarde alguns minutos e seu site estará online!

### **Para Teste Local:**
1. Extraia os arquivos em uma pasta
2. Abra o terminal/prompt na pasta do projeto
3. Execute: `python -m http.server 8000`
4. Acesse: `http://localhost:8000`

**⚠️ Importante:** Não abra o `index.html` diretamente no navegador, pois isso causará erros de CORS. Sempre use um servidor HTTP local.

## 🛠 **Tecnologias Utilizadas**

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e responsividade
- **JavaScript ES6+** - Funcionalidades interativas
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📊 **Estatísticas**

- **Tamanho:** ~80KB (ZIP compactado)
- **Arquivos:** 25 arquivos organizados
- **Aulas:** 16 completas com conteúdo expandido
- **Questões:** 160 questões de quiz
- **Compatibilidade:** Todos os navegadores modernos
- **Performance:** Carregamento rápido e responsivo

## 👨‍💻 **Desenvolvedor**

**Carlos Henrique**  
Monitor da Disciplina de Arquitetura de Computadores do Séc. XXI  
Engenharia da Computação 2024-2028

### **Redes Sociais:**
- 🔗 [LinkedIn](https://www.linkedin.com/in/carlosoliver/)
- 📷 [Instagram](https://instagram.com/carlosoliver)
- 💻 [GitHub](https://github.com/CarlosHOliver)
- 📘 [Facebook](http://fb.com/CarlosHOliver)

---

## 📝 **Changelog - Versão Corrigida**

### **v2.1 - Correções Críticas**
- ✅ **Corrigida renderização de Markdown** - Textos em negrito funcionando
- ✅ **Corrigido sistema de quiz** - Modal abrindo e questões carregando
- ✅ **Corrigido favicon 404** - Ícone personalizado adicionado
- ✅ **Melhorada inicialização DOM** - Elementos carregados corretamente
- ✅ **Otimizada estrutura de dados** - Quiz acessando dados corretamente

### **v2.0 - Conteúdo Expandido**
- 📚 Conteúdo didático completamente reformulado
- 🔍 Pesquisa externa para enriquecer o material
- 📝 Linguagem simplificada e didática
- 🎨 Design responsivo e menu lateral dinâmico

### **v1.0 - Versão Inicial**
- 🏗️ Estrutura básica do site
- 📱 Layout responsivo
- 🎯 Sistema de quiz básico
- 🎮 Easter egg do Código Konami

---

**🎓 Pronto para ser usado pelos alunos e hospedado no GitHub Pages!**

