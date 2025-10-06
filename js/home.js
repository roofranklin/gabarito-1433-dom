// Rota de proteção
const username = localStorage.getItem('username');
if (!username) {
    window.location.href = 'index.html';
}

// Mensagem de boas-vindas
const welcomeMessage = document.getElementById('welcome-message');
if (welcomeMessage) {
    welcomeMessage.innerText = `Olá, ${username}`;
}

// Logout
const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}

// Buscar e renderizar produtos
const productsGrid = document.getElementById('products-grid');

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Fetch error:', error);
        productsGrid.innerHTML = '<p class="text-danger">Failed to load products.</p>';
    }
}

function renderProducts(products) {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain; padding: 10px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text mt-auto"><strong>Price:</strong> $${product.price}</p>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

fetchProducts();