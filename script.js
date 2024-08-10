
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
                price: { value1: 47, value2: 27 },
                description: 'A 21-day weight loss program featuring delicious and healthy smoothies. Ingredients include various fruits and vegetables.',
                ingredients: 'Various fruits and vegetables',
                affiliateLink: 'https://1401cv0kqgnd1y7k1ctgj4x03e.hop.clickbank.net'
            }
        ];

        // Function to get query parameters from the URL
        const getQueryParam = (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        // Function to view product details
        const viewProduct = (code) => {
            const product = products.find(p => p.code === code);
            if (product) {
                document.getElementById('product-detail').innerHTML = `
                    <div class="product-info">
                        <img id="product-image" class="product-image" src="${product.image}" alt="${product.title}">
                        <div class="product-description-container">
                            <h1 id="product-title" class="product-title">${product.title}</h1>
                            <p id="product-description" class="product-description">${product.description}</p>
                            <p id="product-ingredients" class="product-ingredients"><strong>Ingredients:</strong> ${product.ingredients}</p>
                            <a href="${product.affiliateLink}" target="_blank"><button>Buy Now</button></a>
                            <button onclick="window.location.href='index.html'">Back to Products</button>
                            <div class="terms-notice">
                                <h5>Please read our <a href="/html/terms.html">Terms & Policy</a> before purchase</h5>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById('product-detail').innerHTML = '<p>Product not found</p>';
            }
        };

        // On page load, check if 'code' is in the URL and load the appropriate product
        window.onload = () => {
            const code = getQueryParam('code');
            if (code) {
                viewProduct(parseInt(code));  // Assuming 'code' is an integer
            }
        }