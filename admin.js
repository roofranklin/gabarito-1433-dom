document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

const tbody = document.getElementById('products-table-body');

async function carregarProdutos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const produtos = await response.json();

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
const productTitleInput = document.getElementById('product-title');
const productPriceInput = document.getElementById('product-price');

// Abre o modal para adicionar um novo produto
addProductBtn.addEventListener('click', () => {
    productModalLabel.textContent = 'Adicionar Novo Produto';
    productForm.reset();
    delete productForm.dataset.editingId; // Limpa o ID de edição
    productModal.show();
});

// Lida com o envio do formulário (tanto para adicionar quanto para editar)
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const produtoAtualizado = {
        title: productTitleInput.value,
        price: parseFloat(productPriceInput.value),
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    };

    const id = productForm.dataset.editingId;

    if (id) {
        await atualizarProduto(id, produtoAtualizado);
    } else {
        await adicionarProduto(produtoAtualizado);
    }
});

async function adicionarProduto(produto) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const produtoAdicionado = await response.json();
        adicionarLinhaProduto(produtoAdicionado);
        productModal.hide();
    } catch (error) {
        console.error('Falha ao adicionar produto:', error);
    }
}

function adicionarLinhaProduto(produto) {
    const tr = document.createElement('tr');
    tr.dataset.productId = produto.id; // Adiciona um data-attribute na linha para fácil acesso

    tr.innerHTML = `
        <td>${produto.id}</td>
        <td class="product-title">${produto.title}</td>
        <td class="product-price">R$ ${produto.price.toFixed(2)}</td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${produto.id}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${produto.id}">Deletar</button>
        </td>
    `;
    tbody.appendChild(tr);
}

// --- Delegação de Eventos para Editar e Deletar ---

tbody.addEventListener('click', async (event) => {
    const target = event.target;

    // --- Lógica de Deletar ---
    if (target.classList.contains('delete-btn')) {
        const id = target.dataset.id;
        const confirmacao = confirm('Tem certeza que deseja deletar este produto?');
        if (confirmacao) {
            await deletarProduto(id);
            target.closest('tr').remove();
        }
    }

    // --- Lógica de Editar ---
    if (target.classList.contains('edit-btn')) {
        const id = target.dataset.id;
        await abrirModalEdicao(id);
    }
});

async function deletarProduto(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        console.log(`Produto ${id} deletado com sucesso (simulado).`);
    } catch (error) {
        console.error(`Falha ao deletar produto ${id}:`, error);
    }
}

async function abrirModalEdicao(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const produto = await response.json();

        productModalLabel.textContent = 'Editar Produto';
        productTitleInput.value = produto.title;
        productPriceInput.value = produto.price;
        productForm.dataset.editingId = id; // Armazena o ID no formulário

        productModal.show();
    } catch (error) {
        console.error(`Falha ao buscar produto ${id} para edição:`, error);
    }
}

async function atualizarProduto(id, dados) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const produtoRetornado = await response.json();

        // Atualiza a linha na tabela
        const tr = tbody.querySelector(`tr[data-product-id='${id}']`);
        if (tr) {
            tr.querySelector('.product-title').textContent = produtoRetornado.title;
            tr.querySelector('.product-price').textContent = `R$ ${produtoRetornado.price.toFixed(2)}`;
        }

        productModal.hide();
        delete productForm.dataset.editingId; // Limpa o ID de edição
    } catch (error) {
        console.error(`Falha ao atualizar produto ${id}:`, error);
    }
}