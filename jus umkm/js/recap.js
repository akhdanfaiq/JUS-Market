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

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Load orders from Google Sheets
async function loadOrders() {
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const tableBody = document.getElementById('orders-table-body');
    
    // Show loading
    loadingState.classList.remove('hidden');
    emptyState.classList.add('hidden');
    tableBody.innerHTML = '';
    
    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getOrders`);
        const data = await response.json();
        
        // Hide loading
        loadingState.classList.add('hidden');
        
        if (!data.orders || data.orders.length === 0) {
            emptyState.classList.remove('hidden');
            document.getElementById('total-orders').textContent = '0';
            document.getElementById('total-revenue').textContent = formatCurrency(0);
            return;
        }
        
        // Calculate statistics
        const totalOrders = data.orders.length;
        const totalRevenue = data.orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        // Update statistics
        document.getElementById('total-orders').textContent = totalOrders;
        document.getElementById('total-revenue').textContent = formatCurrency(totalRevenue);
        
        // Populate table
        data.orders.forEach(order => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm text-gray-900">${order.orderId}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${order.customerName}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${order.phone}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${order.product}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${order.quantity}</td>
                <td class="px-6 py-4 text-sm font-semibold text-primary">${formatCurrency(order.totalPrice)}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${formatDate(order.orderDate)}</td>
            `;
            tableBody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error loading orders:', error);
        loadingState.classList.add('hidden');
        emptyState.classList.remove('hidden');
        document.getElementById('empty-state').innerHTML = `
            <div class="text-6xl mb-4">⚠️</div>
            <p class="text-gray-600 text-lg">Failed to load orders</p>
            <p class="text-gray-500 text-sm mt-2">Please check your Google Apps Script configuration</p>
        `;
    }
}

// Initialize - load orders on page load
loadOrders();
