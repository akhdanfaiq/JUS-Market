// Product Data
const products = [
    {
        id: 1,
        name: 'Orange Juice',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
        description: 'Fresh squeezed orange juice, rich in Vitamin C'
    },
    {
        id: 2,
        name: 'Strawberry Juice',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
        description: 'Sweet and refreshing strawberry juice'
    },
    {
        id: 3,
        name: 'Mango Juice',
        price: 17000,
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
        description: 'Tropical mango juice, naturally sweet'
    },
    {
        id: 4,
        name: 'Watermelon Juice',
        price: 14000,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=400',
        description: 'Hydrating watermelon juice, perfect for hot days'
    },
    {
        id: 5,
        name: 'Apple Juice',
        price: 16000,
        image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400',
        description: 'Crisp and refreshing apple juice'
    },
    {
        id: 6,
        name: 'Mixed Berry Juice',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
        description: 'Blend of strawberries, blueberries, and raspberries'
    }
];

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Load products on homepage
function loadProducts() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-lg overflow-hidden';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h4 class="text-xl font-bold text-gray-800 mb-2">${product.name}</h4>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-primary">${formatCurrency(product.price)}</span>
                    <button onclick="orderProduct(${product.id})" 
                            class="bg-accent hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg">
                        Buy Now
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Redirect to order page with product
function orderProduct(productId) {
    window.location.href = `order.html?product=${productId}`;
}

// Initialize
if (document.getElementById('products-container')) {
    loadProducts();
}

// Export products for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, formatCurrency };
}
