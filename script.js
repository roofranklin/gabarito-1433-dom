const catalogoContainer = document.getElementById('catalogo');
const formProduto = document.getElementById('form-produto');
const inputTitulo = document.getElementById('input-titulo');
const inputPreco = document.getElementById('input-preco');

let listaDeProdutos = [];

function criarCardProduto(produto) {
    const card = document.createElement('article');
    card.className = 'card-produto col-12 col-sm-6 col-md-4';

    const imagem = document.createElement('img');
    // Usa uma imagem padrão se o produto não tiver uma (para itens adicionados manualmente)
    imagem.src = produto.image || 'https://via.placeholder.com/150';
    imagem.alt = produto.title;

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `R$ ${Number(produto.price).toFixed(2)}`;

    card.appendChild(imagem);
    card.appendChild(titulo);
    card.appendChild(preco);

    return card;
}

function renderizarProdutos() {
    catalogoContainer.innerHTML = ''; // Limpa o catálogo visual
    listaDeProdutos.forEach(produto => {
        const card = criarCardProduto(produto);
        catalogoContainer.appendChild(card);
    });
}

function salvarProdutosNoStorage() {
    localStorage.setItem('produtos', JSON.stringify(listaDeProdutos));
}

function buscarProdutosDaAPI() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      listaDeProdutos = produtos;
      renderizarProdutos();
      salvarProdutosNoStorage();
    })
    .catch(erro => console.error('Erro ao buscar produtos:', erro));
}

formProduto.addEventListener('submit', function(event) {
    event.preventDefault();
    const tituloDigitado = inputTitulo.value.trim();
    const precoDigitado = inputPreco.value;

    if (tituloDigitado && precoDigitado) {
        const novoProduto = {
            // O ID pode ser útil no futuro, geramos um simples baseado no tempo
            id: Date.now(),
            title: tituloDigitado,
            price: precoDigitado,
            image: '' // Novos produtos não terão imagem da API
        };
        listaDeProdutos.push(novoProduto);
        renderizarProdutos();
        salvarProdutosNoStorage();
        inputTitulo.value = '';
        inputPreco.value = '';
    }
});

window.onload = function() {
  const produtosSalvos = localStorage.getItem('produtos');
  if (produtosSalvos) {
    listaDeProdutos = JSON.parse(produtosSalvos);
    renderizarProdutos();
  } else {
    buscarProdutosDaAPI(); // Só busca da API se o storage estiver vazio
  }
};