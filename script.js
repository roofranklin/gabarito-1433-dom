let contador = 0;

const valorDisplay = document.querySelector('#valor-contador');
const btnAdicionar = document.querySelector('#btn-adicionar');
const btnSubtrair = document.querySelector('#btn-subtrair');

function atualizarDisplayContador() {
  valorDisplay.innerText = contador;
  if (contador < 0) {
    valorDisplay.style.color = 'red';
  } else {
    valorDisplay.style.color = 'green';
  }
}

btnAdicionar.addEventListener('click', function() {
    contador++;
    atualizarDisplayContador();
});

btnSubtrair.addEventListener('click', function() {
    contador--;
    atualizarDisplayContador();
});

atualizarDisplayContador(); // Chama a função na inicialização
const form = document.querySelector('#cadastroForm');
const inputNome = document.querySelector('#nomeCompleto');
const listaUsuarios = document.querySelector('#lista-usuarios');

inputNome.addEventListener('input', function() {
  if (inputNome.value.trim() === '') {
    // .trim() remove espaços em branco do início e fim
    inputNome.classList.add('input-error');
    inputNome.classList.remove('input-success');
  } else {
    inputNome.classList.add('input-success');
    inputNome.classList.remove('input-error');
  }
});

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const nomeCompleto = document.getElementById('nomeCompleto');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const dataNascimento = document.getElementById('dataNascimento');
    const termos = document.getElementById('termos');
    const mensagem = document.getElementById('mensagem');

    // Limpa a mensagem de erro/sucesso anterior
    mensagem.textContent = '';
    mensagem.style.color = 'red'; // Cor padrão para erros

    const nomeDigitado = inputNome.value;

    if (nomeDigitado.trim() === '') {
        mensagem.textContent = 'O campo Nome Completo não pode estar vazio.';
        return;
    }

    if (!email.value.includes('@')) {
        mensagem.textContent = 'O campo E-mail deve incluir o caractere @.';
        return;
    }

    if (senha.value.length < 8) {
        mensagem.textContent = 'A senha deve ter no mínimo 8 caracteres.';
        return;
    }

    if (dataNascimento.value === '') {
        mensagem.textContent = 'O campo Data de Nascimento não pode estar vazio.';
        return;
    }

    if (!termos.checked) {
        mensagem.textContent = 'Você precisa aceitar os termos.';
        return;
    }

    mensagem.textContent = 'Usuário cadastrado com sucesso!';
    mensagem.style.color = 'green';

    // 1. Criar o <li>
    const novoLi = document.createElement('li');

    // 2. Configurar o <li>
    novoLi.textContent = `Nome: ${nomeDigitado}`;

    // 3. Anexar o <li> à <ul>
    listaUsuarios.appendChild(novoLi);

    // Limpar o campo do formulário após o envio
    inputNome.value = '';
    inputNome.classList.remove('input-success'); // Reseta a classe
});