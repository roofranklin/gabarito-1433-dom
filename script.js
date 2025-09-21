let contador = 0;

const valorDisplay = document.querySelector('#valor-contador');
const btnAdicionar = document.querySelector('#btn-adicionar');
const btnSubtrair = document.querySelector('#btn-subtrair');

btnAdicionar.onclick = function() {
  contador++; // Incrementa a variável
  valorDisplay.innerText = contador; // Atualiza o texto na tela
};

btnSubtrair.onclick = function() {
  contador--; // Decrementa a variável
  valorDisplay.innerText = contador; // Atualiza o texto na tela
};

const inputNome = document.querySelector('#campo-nome');
const btnEnviar = document.querySelector('#btn-enviar');
const feedback = document.querySelector('#feedback-msg');

btnEnviar.onclick = function(event) {
  event.preventDefault(); // MUITO IMPORTANTE! Impede o recarregamento da página.

  const nomeDigitado = inputNome.value; // .value para pegar o valor de um input

  // Validação simples
  if (nomeDigitado === '') {
    feedback.innerText = 'Erro: O campo nome não pode estar vazio!';
    feedback.style.color = 'red'; // Bônus: manipulando o CSS
  } else {
    feedback.innerText = 'Formulário enviado com sucesso!';
    feedback.style.color = 'green';
  }
};