const catalogoContainer = document.getElementById('catalogo');
const formProduto = document.getElementById('form-produto');
const inputTitulo = document.getElementById('input-titulo');
const inputPreco = document.getElementById('input-preco');
const destaqueContainer = document.getElementById('destaque');

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

function renderizarProduto(produto) {
    const card = criarCardProduto(produto);
    destaqueContainer.appendChild(card);
}

function salvarProdutosNoStorage() {
    localStorage.setItem('produtos', JSON.stringify(listaDeProdutos));
}

// function buscarProdutosDaAPI() {
//   fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(produtos => {
//       listaDeProdutos = produtos;
//       renderizarProdutos();
//       salvarProdutosNoStorage();
//
//       const primeiroProdutoId = produtos[0].id;
//
//       // ANINHADO! Já começa a ficar confuso.
//       fetch(`https://fakestoreapi.com/products/${primeiroProdutoId}`)
//       .then(res => res.json())
//       .then(detalheProduto => {
//         console.log("Detalhe do primeiro produto:", detalheProduto);
//         // Onde exibir isso? A complexidade aumenta...
//       });
//     })
//     .catch(erro => console.error('Erro ao buscar produtos:', erro));
// }

// A NOVA FORMA:
async function carregarProdutos() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const produtos = await response.json();
    
    listaDeProdutos = produtos;

    // Limpa os containers antes de renderizar
    destaqueContainer.innerHTML = '';
    catalogoContainer.innerHTML = '';

    // Renderiza o primeiro produto em destaque fazendo uma nova chamada à API
    if (produtos.length > 0) {
      const primeiroProdutoId = produtos[0].id;
      
      // 2ª chamada: Busca os detalhes do primeiro produto
      const responseDestaque = await fetch(`https://fakestoreapi.com/products/${primeiroProdutoId}`);
      if (!responseDestaque.ok) {
        throw new Error(`Erro HTTP ao buscar destaque: ${responseDestaque.status}`);
      }
      const produtoDestaque = await responseDestaque.json();

      // Renderiza o produto obtido na segunda chamada
      const cardDestaque = criarCardProduto(produtoDestaque);
      destaqueContainer.appendChild(cardDestaque);
    }

    // Renderiza todos os produtos no catálogo
    renderizarProdutos();
    salvarProdutosNoStorage();

  } catch (erro) {
    console.error("Ocorreu um erro na busca de produtos:", erro);
    catalogoContainer.innerHTML = '<p class="erro">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
  }
}

// A chamada da função foi movida para o evento window.onload


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
    
    // Renderiza o primeiro produto em destaque a partir do storage
    if (listaDeProdutos.length > 0) {
      destaqueContainer.innerHTML = '';
      const cardDestaque = criarCardProduto(listaDeProdutos[0]);
      destaqueContainer.appendChild(cardDestaque);
    }

    // Renderiza o restante no catálogo
    renderizarProdutos();
  } else {
    // Só busca da API se o storage estiver vazio
    carregarProdutos();
  }
};