// Hardcoded Inventory matching the data attributes in HTML
const inventory = {
    1: { name: "NeoPulse Orb", price: 49 },
    2: { name: "Plasma Core", price: 89 },
    3: { name: "Void Filament", price: 120 }
};

// Application State
let cart = [];

// Open or Close Cart Menu
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// Add Item to the State Array
function addToCart(productId) {
    const product = inventory[productId];
    
    // Check if product already exists in cart array
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartUI();
}

// Redraw UI based on State
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update Badge Counter
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    // Clear display area
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">No items in matrix.</p>';
        cartTotal.innerText = '$0';
        return;
    }
    
    // Build cart items dynamically
    let totalPrice = 0;
    cart.forEach(item => {
        const itemCost = item.price * item.quantity;
        totalPrice += itemCost;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${item.quantity}x @ $${item.price}</small>
            </div>
            <span>$${itemCost}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotal.innerText = `$${totalPrice}`;
}

// Simple Alert Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your order matrix is empty!");
        return;
    }
    alert("Transaction broadcasted to the blockchain! Thank you for buying from LUMENEX.");
    cart = [];
    updateCartUI();
    toggleCart();
}
