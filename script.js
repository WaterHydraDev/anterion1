const products = [
    { id: 0, image: 'assets/images/Ikaria-Juice-Product-1.png', title: 'Ikaria Juice', price: { value1: 69, value2: 39 }, description: 'A healthy juice', ingredients: 'Water, Sugar, Lemon', affiliateLink: 'https://affiliate-link.com/ikaria-juice' },
    { id: 1, image: 'assets/images/SugarDefender-1.webp', title: 'Sugar Defender', price: { value1: 69, value2: 49 }, description: 'Protects against sugar', ingredients: 'Cinnamon, Chromium, Berberine', affiliateLink: 'https://affiliate-link.com/sugar-defender' },
    { id: 2, image: 'assets/images/GreenGlucose-1.png', title: 'Green Glucose', price: { value1: 79, value2: 49 }, description: 'Supports healthy glucose levels', ingredients: 'Green Tea, Gymnema, Alpha Lipoic Acid', affiliateLink: 'https://affiliate-link.com/green-glucose' },
    { id: 3, image: 'assets/images/Sumatra-1.png', title: 'Sumatra Slim Belly Tonic', price: { value1: 59, value2: 39 }, description: 'Tones the belly', ingredients: 'Ginger, Turmeric, Cinnamon', affiliateLink: 'https://affiliate-link.com/sumatra-tonic' },
    { id: 4, image: 'assets/images/TheSoomthieDiet.png', title: 'The Soomthie Diet', price: 47, discountedPrice: 27, description: 'A smoothie diet plan', ingredients: 'Various fruits and vegetables', affiliateLink: 'https://affiliate-link.com/smoothie-diet' }
];

const searchBar = document.getElementById('searchBar');
const filter = document.getElementById('filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

// Function to get effective price
const getEffectivePrice = (item) => {
    if (item.discountedPrice !== undefined) {
        return item.discountedPrice;
    } else if (typeof item.price === 'object') {
        return item.price.value2;
    }
    return item.price;
};

// Function to filter and display items
const filterAndDisplayItems = () => {
    let searchData = searchBar.value.toLowerCase();
    let filteredData = products.filter(item => 
        item.title.toLowerCase().includes(searchData)
    );

    const sortBy = filter.value;

    if (sortBy === 'lowest') {
        filteredData.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    } else if (sortBy === 'highest') {
        filteredData.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    } else if (sortBy === 'a-z') {
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'minmax') {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        filteredData = filteredData.filter(item => {
            const effectivePrice = getEffectivePrice(item);
            return effectivePrice >= minPrice && effectivePrice <= maxPrice;
        });
    }

    displayItem(filteredData);
};

// Function to display items on the main page
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map(item => {
        const { image, title, price, discountedPrice, id } = item;
        let displayOriginalPrice = '';
        let displayDiscountedPrice = '';

        if (discountedPrice !== undefined) {
            displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00` : `$${price}.00`;
            displayDiscountedPrice = `$${discountedPrice}.00`;
        } else {
            displayOriginalPrice = typeof price === 'object' ? `$${price.value1}.00 - $${price.value2}.00` : `$${price}.00`;
        }

        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image} alt='${title}'>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <div class='price-container'>
                        ${discountedPrice !== undefined ? `<h2 class='original-price' style="color: black; text-decoration: line-through;">${displayOriginalPrice}</h2>` : `<h2 class='original-price'>${displayOriginalPrice}</h2>`}
                        ${discountedPrice !== undefined ? `<h2 class='discounted-price'>${displayDiscountedPrice}</h2>` : ''}
                    </div>
                    <button onclick="viewProduct(${id})">View Product</button>
                </div>
            </div>
        `;
    }).join('');
};

// Function to view product details
const viewProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
        document.body.innerHTML = `
            <header>
                <div class="container">
                    <nav>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="/html/terms.html">Terms & Policy</a></li>
                            <li><a href="/html/faq.html">FAQ</a></li>                
                            <li><a href="/html/contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div id="product-detail" class="product-detail">
                <div class="product-info">
                    <img id="product-image" class="product-image" src="${product.image}" alt="${product.title}">
                    <div class="product-description-container">
                        <h1 id="product-title" class="product-title">${product.title}</h1>
                        <p id="product-description" class="product-description">${product.description}</p>
                        <p id="product-ingredients" class="product-ingredients"><strong>Ingredients:</strong> ${product.ingredients}</p>
                        <a href="${product.affiliateLink}" target="_blank"><button>Buy Now</button></a>
                        <button onclick="window.history.back()">Back to Products</button>
                        <div class="terms-notice">
                            <h5>Please read our <a href="/html/terms.html">Terms & Policy</a> before purchase</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        document.body.innerHTML = '<p>Product not found</p>';
    }
};

// Event listeners for search and filter
searchBar.addEventListener('keyup', filterAndDisplayItems);
filter.addEventListener('change', (e) => {
    if (e.target.value === 'minmax') {
        minPriceInput.style.display = 'block';
        maxPriceInput.style.display = 'block';
    } else {
        minPriceInput.style.display = 'none';
        maxPriceInput.style.display = 'none';
        minPriceInput.value = '';
        maxPriceInput.value = '';
    }
    filterAndDisplayItems();
});

minPriceInput.addEventListener('input', filterAndDisplayItems);
maxPriceInput.addEventListener('input', filterAndDisplayItems);

// Initial display
displayItem(products);
