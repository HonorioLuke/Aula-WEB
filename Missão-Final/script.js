/* --- SISTEMA DE NAVEGAÇÃO E LOGIN --- */

function navegarPara(idTela) {
    // 1. Esconde todas as seções
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Mostra a seção desejada
    document.getElementById(idTela).classList.remove('hidden');
}

// Lógica de Login
const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede recarregar a página

    const username = document.getElementById('username').value;
    const nome = document.getElementById('nome-completo').value;

    if(username && nome) {
        // Atualiza cabeçalho e mostra menu
        document.getElementById('display-username').textContent = username;
        document.getElementById('app-header').classList.remove('hidden');
        navegarPara('tela-menu');
    }
});


/* --- APP 1: JOGO DA VELHA --- */
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let vezDoJogador = 'X';
let jogoAtivo = true;

const celulas = document.querySelectorAll('.celula');
const statusTxt = document.getElementById('status-velha');

// Adiciona evento de clique em cada célula
celulas.forEach(celula => {
    celula.addEventListener('click', () => {
        const index = celula.getAttribute('data-index');

        if (tabuleiro[index] === '' && jogoAtivo) {
            tabuleiro[index] = vezDoJogador;
            celula.textContent = vezDoJogador;
            celula.style.color = vezDoJogador === 'X' ? 'blue' : 'red';
            verificarVencedor();
            if(jogoAtivo) trocarJogador();
        }
    });
});

function trocarJogador() {
    vezDoJogador = vezDoJogador === 'X' ? 'O' : 'X';
    statusTxt.textContent = `Vez do Jogador: ${vezDoJogador}`;
}

function verificarVencedor() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    let venceu = false;

    for (let i = 0; i < combinacoesVitoria.length; i++) {
        const [a, b, c] = combinacoesVitoria[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            venceu = true;
            break;
        }
    }

    if (venceu) {
        statusTxt.textContent = `Vencedor: ${vezDoJogador}! 🎉`;
        jogoAtivo = false;
    } else if (!tabuleiro.includes('')) {
        statusTxt.textContent = "Empate (Velha)!";
        jogoAtivo = false;
    }
}

function reiniciarVelha() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    vezDoJogador = 'X';
    statusTxt.textContent = "Vez do Jogador: X";
    celulas.forEach(c => c.textContent = '');
}


/* --- APP 2: CALCULADORA --- */
const display = document.getElementById('display-calc');

function addCalc(valor) {
    display.value += valor;
}

function limparCalc() {
    display.value = '';
}

function calcularResultado() {
    try {
        // eval é perigoso em sites reais, mas serve para estudos simples
        display.value = eval(display.value); 
    } catch (e) {
        display.value = 'Erro';
    }
}


/* --- APP 3: ADIVINHE O NÚMERO --- */
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
const msgAdivinhacao = document.getElementById('msg-adivinhacao');

function verificarChute() {
    const chute = parseInt(document.getElementById('chute').value);

    if (isNaN(chute) || chute < 1 || chute > 100) {
        msgAdivinhacao.textContent = "Digite um número válido entre 1 e 100!";
        msgAdivinhacao.style.color = "red";
        return;
    }

    if (chute === numeroSecreto) {
        msgAdivinhacao.textContent = `Parabéns! Você acertou o número ${numeroSecreto}! 🏆`;
        msgAdivinhacao.style.color = "green";
    } else if (chute > numeroSecreto) {
        msgAdivinhacao.textContent = "Muito alto! Tente um número menor. 👇";
        msgAdivinhacao.style.color = "orange";
    } else {
        msgAdivinhacao.textContent = "Muito baixo! Tente um número maior. 👆";
        msgAdivinhacao.style.color = "orange";
    }
}

function iniciarAdivinhacao() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    document.getElementById('chute').value = '';
    msgAdivinhacao.textContent = 'Novo jogo iniciado. Boa sorte!';
    msgAdivinhacao.style.color = 'black';
}