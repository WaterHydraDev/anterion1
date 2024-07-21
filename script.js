const products = [
    { id: 0, image: 'assets/images/Ikaria-Juice-Product-1.png', title: 'Ikaria Juice', price: { value1: 69, value2: 39 }, productpage: 'products/ikariajuice.html' },
    { id: 1, image: 'assets/images/SugarDefender-1.webp', title: 'Sugar Defender', price: { value1: 69, value2: 49 }, productpage: 'products/sugardefender.html' },
    { id: 2, image: 'assets/images/GreenGlucose-1.png', title: 'Green Glucose', price: { value1: 79, value2: 49 }, productpage: 'products/greenglucose.html' },
    { id: 3, image: 'assets/images/Sumatra-1.png', title: 'Sumatra Slim Belly Tonic', price: { value1: 59, value2: 39 }, productpage: 'products/sumatra.html' },
    { id: 4, image: 'assets/images/TedWoodWorking.jpg', title: 'Ted Wood Working', price: 67, productpage: 'products/tedwoodworking.html' },
    { id: 5, image: 'image/cc-1.jpg', title: 'Smart Watch', price: 100, productpage: 'https://example.com/smart-watch' },
    { id: 6, image: 'image/hh-2.jpg', title: 'Air Pods Pro', price: 60, productpage: 'https://example.com/air-pods-pro' },
    { id: 7, image: 'image/hh-2.jpg', title: 'Air Pods Pro', price: 60, productpage: 'https://example.com/air-pods-pro' },
    { id: 8, image: 'image/hh-2.jpg', title: 'Air Pods Pro', price: 60, productpage: 'https://example.com/air-pods-pro' },
    { id: 9, image: 'image/hh-2.jpg', title: 'Air Pods Pro', price: 60, productpage: 'https://example.com/air-pods-pro' },
];

let categories = [...new Set(products.map(item => item))];

const searchBar = document.getElementById('searchBar');
const filter = document.getElementById('filter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

const filterAndDisplayItems = () => {
    let searchData = searchBar.value.toLowerCase();
    let filteredData = categories.filter(item => 
        item.title.toLowerCase().includes(searchData)
    );

    const sortBy = filter.value;

    if (sortBy === 'lowest') {
        filteredData.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortBy === 'highest') {
        filteredData.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sortBy === 'a-z') {
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'minmax') {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        filteredData = filteredData.filter(item => getPrice(item) >= minPrice && getPrice(item) <= maxPrice);
    }

    displayItem(filteredData);
};

const getPrice = (item) => {
    if (typeof item.price === 'object') {
        return item.price.value1 + item.price.value2;
    }
    return item.price;
};

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

const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map(item => {
        const { image, title, price, productpage } = item;
        const displayPrice = typeof price === 'object' ? `$${price.value1} - $${price.value2}` : `$${price}.00`;
        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image} alt='${title}'>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>${displayPrice}</h2>
                    <a href="${productpage}" target="_blank"><button>View Product</button></a>
                </div>
            </div>
        `;
    }).join('');
};

displayItem(categories);
