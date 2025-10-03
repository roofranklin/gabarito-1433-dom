document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

async function carregarProdutos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const produtos = await response.json();

        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

        produtos.forEach(produto => {
            adicionarLinhaProduto(produto);
        });
    } catch (error) {
        console.error('Falha ao carregar produtos:', error);
    }
}

// --- Lógica para Adicionar/Editar Produto ---

const addProductBtn = document.getElementById('add-product-btn');
const productModalElement = document.getElementById('product-modal');
const productModal = new bootstrap.Modal(productModalElement);
const productForm = document.getElementById('product-form');
const productModalLabel = document.getElementById('product-modal-label');
const productIdInput = document.getElementById('product-id');
const productTitleInput = document.getElementById('product-title');
const productPriceInput = document.getElementById('product-price');

// Abre o modal para adicionar um novo produto
addProductBtn.addEventListener('click', () => {
    productModalLabel.textContent = 'Adicionar Novo Produto';
    productForm.reset(); // Limpa campos de um uso anterior
    productIdInput.value = ''; // Garante que não há ID
    productModal.show();
});

// Lida com o envio do formulário (tanto para adicionar quanto para editar)
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const produto = {
        title: productTitleInput.value,
        price: parseFloat(productPriceInput.value),
        // A API da Fake Store espera outros campos, vamos preenchê-los com valores fixos
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };

    // Se houver um ID, é uma edição. Se não, é uma adição.
    const id = productIdInput.value;
    if (id) {
        // Lógica de edição (será implementada depois)
    } else {
        await adicionarProduto(produto);
    }
});

async function adicionarProduto(produto) {
    try {
        /*
        AVISO IMPORTANTE: A Fake Store API simula as requisições POST, PUT, DELETE.
        Ela retorna uma resposta de sucesso, mas não altera os dados de verdade no servidor.
        O que faremos é atualizar a interface (o DOM) para refletir a mudança que
        deveria ter acontecido.
        */
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const produtoAdicionado = await response.json();

        // Adicionamos o produto retornado (com ID simulado) à tabela
        adicionarLinhaProduto(produtoAdicionado);

        productModal.hide(); // Fecha o modal
    } catch (error) {
        console.error('Falha ao adicionar produto:', error);
    }
}

function adicionarLinhaProduto(produto) {
    const tbody = document.getElementById('products-table-body');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.title}</td>
        <td>R$ ${produto.price.toFixed(2)}</td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${produto.id}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${produto.id}">Deletar</button>
        </td>
    `;
    tbody.appendChild(tr);
}