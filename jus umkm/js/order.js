// Import products data
const products = [
    { id: 1, name: 'Orange Juice', price: 15000 },
    { id: 2, name: 'Strawberry Juice', price: 18000 },
    { id: 3, name: 'Mango Juice', price: 17000 },
    { id: 4, name: 'Watermelon Juice', price: 14000 },
    { id: 5, name: 'Apple Juice', price: 16000 },
    { id: 6, name: 'Mixed Berry Juice', price: 20000 }
];

// Google Apps Script Web App URL - REPLACE WITH YOUR DEPLOYED WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5aqwvH12KBw6WMZeIAtc3h68GwRyjSOz7Xbi5jFHgi3-L1aLRi9STPnsK2HI22OxK/exec';

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Load products into select dropdown
function loadProductOptions() {
    const select = document.getElementById('product-select');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - ${formatCurrency(product.price)}`;
        option.dataset.price = product.price;
        select.appendChild(option);
    });
}

// Calculate total price
function calculateTotal() {
    const select = document.getElementById('product-select');
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption && selectedOption.dataset.price) {
        const price = parseInt(selectedOption.dataset.price);
        const total = price * quantity;
        document.getElementById('total-price').textContent = formatCurrency(total);
    } else {
        document.getElementById('total-price').textContent = formatCurrency(0);
    }
}

// Generate Order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD${timestamp}${random}`;
}

// Show/Hide Modal
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Submit order to Google Sheets
async function submitOrder(orderData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        // Note: no-cors mode doesn't allow reading response
        // We assume success if no error is thrown
        return { success: true };
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
}

// Handle form submission
document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;
    const productSelect = document.getElementById('product-select');
    const productId = parseInt(productSelect.value);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Get product details
    const product = products.find(p => p.id === productId);
    const totalPrice = product.price * quantity;
    
    // Create order object
    const orderData = {
        orderId: generateOrderId(),
        customerName: customerName,
        phone: customerPhone,
        address: customerAddress,
        product: product.name,
        quantity: quantity,
        totalPrice: totalPrice,
        orderDate: new Date().toISOString()
    };
    
    // Show loading modal
    showModal('loading-modal');
    
    try {
        // Submit to Google Sheets
        await submitOrder(orderData);
        
        // Hide loading, show success
        hideModal('loading-modal');
        showModal('success-modal');
        
        // Reset form
        document.getElementById('order-form').reset();
        calculateTotal();
    } catch (error) {
        hideModal('loading-modal');
        alert('Failed to submit order. Please try again.');
    }
});

// Event listeners for price calculation
document.getElementById('product-select').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// Check for pre-selected product from URL
function checkPreselectedProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        document.getElementById('product-select').value = productId;
        calculateTotal();
    }
}

// Initialize
loadProductOptions();
checkPreselectedProduct();
