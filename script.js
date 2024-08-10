// Array to store product details
const products = [
    {
        id: 0,
        code: 1001,
        image: 'assets/images/Ikaria-Juice-Product-1.png',
        title: 'Ikaria Juice',
        price: { value1: 69, value2: 39 },
        description: 'Ancient “Juice” Melts Fat Fast. Experience the power of nature with a blend of potent ingredients designed to aid weight loss.',
        ingredients: 'Milk Thistle, Taraxacum, Panax Ginseng, Resveratrol, Citrus Pectin, EGCG, Fucoxanthin, Bioperine',
        affiliateLink: 'https://theikariajuice.com?&shield=ff0925wsrkmkxuddke55l-6k3e'
    },
    {
        id: 1,
        code: 1002,
        image: 'assets/images/SugarDefender-1.webp',
        title: 'Sugar Defender',
        price: { value1: 69, value2: 49 },
        description: 'Defend against sugar-related health issues with a powerful blend of natural ingredients. Ingredients include Cinnamon, Chromium, Berberine, Gymnema Sylvestre, and Alpha Lipoic Acid.',
        ingredients: 'Cinnamon, Chromium, Berberine, Gymnema Sylvestre, Alpha Lipoic Acid',
        affiliateLink: 'https://ef9c560indmhwv9rybfhk6sz1v.hop.clickbank.net'
    },
    {
        id: 2,
        code: 1003,
        image: 'assets/images/GreenGlucose-1.png',
        title: 'Green Glucose',
        price: { value1: 79, value2: 49 },
        description: 'Supports healthy glucose levels with a potent blend of natural ingredients. Ingredients include Green Tea, Gymnema, Alpha Lipoic Acid, Cinnamon, Chromium, and Berberine.',
        ingredients: 'Green Tea, Gymnema, Alpha Lipoic Acid, Cinnamon, Chromium, Berberine',
        affiliateLink: 'https://2f20a8zmrfxbvnc2z9gfsh27-l.hop.clickbank.net'
    },
    {
        id: 3,
        code: 1004,
        image: 'assets/images/Sumatra-1.png',
        title: 'Sumatra Slim Belly Tonic',
        price: { value1: 59, value2: 39 },
        description: 'Melt stubborn fat with a unique tonic inspired by traditional remedies. Ingredients include Weird Blue Tonic.',
        ingredients: 'Weird Blue Tonic',
        affiliateLink: 'https://e0566xsekitark6i6dio3ayb4c.hop.clickbank.net'
    },
    {
        id: 4,
        code: 1005,
        image: 'assets/images/TheSoomthieDiet.png',
        title: 'The Smoothie Diet',
        price: { discountedPrice: 27 },
        description: 'A 21-day weight loss program featuring delicious and healthy smoothies. Ingredients include various fruits and vegetables.',
        ingredients: 'Various fruits and vegetables',
        affiliateLink: 'https://1401cv0kqgnd1y7k1ctgj4x03e.hop.clickbank.net'
    }
];

// Function to render product list
const renderProducts = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product-item">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Price:</strong> ${product.price.value1 ? `$${product.price.value1} - $${product.price.value2}` : `$${product.price.discountedPrice}`}</p>
            <a href="/product.html?code=${product.code}"><button>View Product</button></a>
        </div>
    `).join('');
};

// On page load, render products
window.onload = renderProducts;

// Function to filter and search products
const filterAndSearchProducts = () => {
    let filteredProducts = [...products];
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filterOption = document.getElementById('filter').value;

    // Filter by search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchQuery) || 
            product.description.toLowerCase().includes(searchQuery)
        );
    }

    // Apply sorting and filtering
    switch (filterOption) {
        case 'lowest':
            filteredProducts.sort((a, b) => {
                const priceA = a.price.value2 || a.price.discountedPrice;
                const priceB = b.price.value2 || b.price.discountedPrice;
                return priceA - priceB;
            });
            break;
        case 'highest':
            filteredProducts.sort((a, b) => {
                const priceA = a.price.value2 || a.price.discountedPrice;
                const priceB = b.price.value2 || b.price.discountedPrice;
                return priceB - priceA;
            });
            break;
        case 'a-z':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'z-a':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'minmax':
            const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
            const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price.value2 || product.price.discountedPrice;
                return price >= minPrice && price <= maxPrice;
            });
            break;
    }

    // Render filtered products
    const productList = document.getElementById('product-list');
    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-item">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Price:</strong> ${product.price.value1 ? `$${product.price.value1} - $${product.price.value2}` : `$${product.price.discountedPrice}`}</p>
            <a href="/product.html?code=${product.code}"><button>View Product</button></a>
        </div>
    `).join('');
};

// Event listeners for search and filter
document.getElementById('searchBar').addEventListener('input', filterAndSearchProducts);
document.getElementById('filter').addEventListener('change', () => {
    const filterValue = document.getElementById('filter').value;
    const minMaxFields = ['minPrice', 'maxPrice'];
    minMaxFields.forEach(field => {
        document.getElementById(field).style.display = filterValue === 'minmax' ? 'inline-block' : 'none';
    });
    filterAndSearchProducts();
});