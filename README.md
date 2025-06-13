# 🎓 Material de Apoio - Arquitetura de Computadores do Século XXI

## 📖 Sobre o Projeto

Este é um site de material de apoio didático para a disciplina de **Arquitetura de Computadores do Século XXI**, desenvolvido especificamente para auxiliar estudantes na revisão e consolidação do conteúdo estudado em sala de aula.

### 🎯 Características Principais

- **16 Aulas Completas** com conteúdo didático e simplificado
- **Menu Lateral Dinâmico** com navegação hierárquica
- **Quizzes Interativos** com 10 questões por aula
- **Design Responsivo** para todos os dispositivos
- **Easter Egg** com o famoso Código Konami
- **Sistema de Pontuação** e compartilhamento social

## 🚀 Como Usar

### Para GitHub Pages (Recomendado)

1. **Faça o download** do arquivo ZIP
2. **Extraia** todos os arquivos para uma pasta
3. **Crie um novo repositório** no GitHub
4. **Faça upload** de todos os arquivos para o repositório
5. **Ative o GitHub Pages** nas configurações do repositório:
   - Vá em `Settings` > `Pages`
   - Selecione `Deploy from a branch`
   - Escolha `main` ou `master` como branch
   - Selecione `/ (root)` como pasta
6. **Aguarde alguns minutos** e seu site estará online!

### Para Teste Local

1. **Extraia** os arquivos do ZIP
2. **Abra o terminal** na pasta do projeto
3. **Execute** um servidor HTTP local:
   ```bash
   python -m http.server 8000
   ```
   ou
   ```bash
   npx serve
   ```
4. **Acesse** `http://localhost:8000` no seu navegador

## 📁 Estrutura do Projeto

```
arquitetura-computadores-site/
├── index.html              # Página principal
├── css/
│   ├── style.css           # Estilos principais
│   └── aula.css           # Estilos específicos das aulas
├── js/
│   ├── main.js            # JavaScript principal
│   ├── quiz.js            # Sistema de quiz
│   └── konami.js          # Easter egg do Código Konami
├── data/
│   └── aulas_data.json    # Dados das aulas e quizzes
└── README.md              # Este arquivo
```

## 🎮 Easter Egg - Código Konami

O site inclui um easter egg especial! Digite a sequência clássica do Código Konami:

**↑ ↑ ↓ ↓ ← → ← → B A**

Uma mensagem especial aparecerá com uma surpresa para o primeiro que enviar um print no LinkedIn!

## 🎨 Design e Tecnologias

### Paleta de Cores
- **Cor Principal**: #08e38d (Verde vibrante)
- **Cores Complementares**: Tons de cinza e branco para contraste
- **Fundo**: Claro e limpo para facilitar a leitura

### Tecnologias Utilizadas
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Interatividade
- **Bootstrap 5** - Framework responsivo
- **JSON** - Armazenamento de dados

## 📚 Conteúdo das Aulas

1. **Introdução à Disciplina** - Uma aventura no mundo dos computadores
2. **Sistemas de Numeração** - Os segredos dos números no computador
3. **Algoritmos** - As receitas mágicas do computador
4. **Linguagens de Programação** - Conversando com o computador
5. **Abstração de Dados** - Escondendo os detalhes
6. **Engenharia de Software** - Construindo programas incríveis
7. **Sistemas Operacionais** - O maestro do computador
8. **Redes de Computadores** - Conectando o mundo
9. **Circuitos Lógicos** - Os pequenos gênios do computador
10. **Mineração de Dados** - Caçando tesouros de informação
11. **Banco de Dados** - O grande cofre de informações
12. **Segurança da Informação** - Protegendo nossos tesouros digitais
13. **Usabilidade e UX** - Criando coisas que amamos usar
14. **Computação Gráfica** - Desenhando com o computador
15. **Sistemas de Informação** - Organizando o conhecimento
16. **Teoria da Computação** - Os grandes pensadores do computador

## 🧩 Funcionalidades dos Quizzes

- **10 questões** por aula com múltipla escolha
- **Sistema de pontuação** em tempo real
- **Explicações detalhadas** para cada resposta
- **Compartilhamento social** dos resultados
- **Progresso salvo** localmente no navegador

## 📱 Responsividade

O site foi desenvolvido com design responsivo, adaptando-se perfeitamente a:

- **Desktop** - Menu lateral sempre visível
- **Tablet** - Menu adaptável com boa usabilidade
- **Mobile** - Menu recolhível com navegação por toque

## 🔧 Personalização

### Alterando Cores
Para alterar a cor principal, edite a variável CSS no arquivo `css/style.css`:

```css
:root {
    --primary-color: #08e38d; /* Altere aqui */
}
```

### Adicionando Conteúdo
Para adicionar novas aulas ou modificar o conteúdo, edite o arquivo `data/aulas_data.json`.

## 📊 Estatísticas do Projeto

- **Tamanho Total**: ~450KB (otimizado)
- **Arquivos**: 8 principais + dados JSON
- **Aulas**: 16 completas com tópicos detalhados
- **Questões de Quiz**: 160 (10 por aula)
- **Compatibilidade**: Todos os navegadores modernos

## 👨‍💻 Créditos

**Desenvolvido carinhosamente por Carlos Henrique**
- Monitor da Disciplina de Arquitetura de Computadores do Séc. XXI
- Engenharia da Computação 2024-2028

### Redes Sociais
- [LinkedIn](https://www.linkedin.com/in/carlosoliver/)
- [Instagram](https://instagram.com/carlosoliver)
- [GitHub](https://github.com/CarlosHOliver)
- [Facebook](http://fb.com/CarlosHOliver)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais. O conteúdo pode ser usado livremente para estudos acadêmicos.

---

**Versão**: 2.0 - Material de Apoio Didático Expandido
**Data**: Junho 2025

