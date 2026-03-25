/* ============================================
   BREW HAVEN CAFÉ - SHOPPING CART SYSTEM
   Complete Cart Management with LocalStorage
   ============================================ */

// ============================================
// CART DATA STRUCTURE & INITIALIZATION
// ============================================

const CART_STORAGE_KEY = 'brewHavenCart';
const CART_HISTORY_KEY = 'brewHavenCartHistory';
const USER_PREFERENCES_KEY = 'brewHavenUserPreferences';

// Initialize cart from localStorage
function initializeCart() {
    if (!localStorage.getItem(CART_STORAGE_KEY)) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(CART_HISTORY_KEY)) {
        localStorage.setItem(CART_HISTORY_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(USER_PREFERENCES_KEY)) {
        localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify({
            preferences: {},
            viewedItems: [],
            cartHistory: []
        }));
    }
}

// Get cart from localStorage
function getCart() {
    initializeCart();
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartDisplay();
    updateNavbarCartCount();
}

// Get user preferences
function getUserPreferences() {
    initializeCart();
    return JSON.parse(localStorage.getItem(USER_PREFERENCES_KEY)) || {
        preferences: {},
        viewedItems: [],
        cartHistory: []
    };
}

// Save user preferences
function saveUserPreferences(prefs) {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(prefs));
}

// ============================================
// CART MANAGEMENT - ADD, REMOVE, UPDATE
// ============================================

/**
 * Add item to cart
 * @param {string} itemName - Name of the item
 * @param {number} price - Price of the item
 * @param {string} category - Category of the item
 * @param {number} quantity - Quantity to add (default: 1)
 */
function addToCart(itemName, price, category, quantity = 1) {
    const cart = getCart();
    const prefs = getUserPreferences();
    
    // Update user preferences - track viewed items and categories
    if (!prefs.viewedItems.includes(itemName)) {
        prefs.viewedItems.push(itemName);
    }
    prefs.preferences[category] = (prefs.preferences[category] || 0) + quantity;
    saveUserPreferences(prefs);
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: `item-${Date.now()}-${Math.random()}`,
            name: itemName,
            price: parseFloat(price),
            category: category,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    showNotification(`${itemName} added to cart!`);
}

/**
 * Remove item from cart
 * @param {string} itemId - ID of the item to remove
 */
function removeFromCart(itemId) {
    let cart = getCart();
    const itemToRemove = cart.find(item => item.id === itemId);
    
    cart = cart.filter(item => item.id !== itemId);
    saveCart(cart);
    
    if (itemToRemove) {
        showNotification(`${itemToRemove.name} removed from cart`);
    }
}

/**
 * Update item quantity in cart
 * @param {string} itemId - ID of the item
 * @param {number} newQuantity - New quantity
 */
function updateCartItemQuantity(itemId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }
}

/**
 * Clear entire cart
 */
function clearCart() {
    const cart = getCart();
    if (cart.length > 0) {
        // Save to history for ML analysis
        const prefs = getUserPreferences();
        prefs.cartHistory.push({
            items: cart,
            total: calculateCartTotal(cart),
            timestamp: new Date().toISOString()
        });
        saveUserPreferences(prefs);
    }
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    updateCartDisplay();
    updateNavbarCartCount();
}

// ============================================
// CART CALCULATIONS
// ============================================

/**
 * Calculate sum of all items in cart
 * @param {array} cart - Cart array
 * @returns {number} Total before tax
 */
function calculateCartSubtotal(cart = null) {
    if (!cart) cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculate tax (10%)
 * @param {array} cart - Cart array
 * @returns {number} Tax amount
 */
function calculateTax(cart = null) {
    const subtotal = calculateCartSubtotal(cart);
    return subtotal * 0.1;
}

/**
 * Calculate total including tax
 * @param {array} cart - Cart array
 * @returns {number} Total with tax
 */
function calculateCartTotal(cart = null) {
    if (!cart) cart = getCart();
    const subtotal = calculateCartSubtotal(cart);
    return subtotal + calculateTax(cart);
}

/**
 * Get cart item count
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// ============================================
// NAVBAR CART ICON UPDATE
// ============================================

function updateNavbarCartCount() {
    const count = getCartItemCount();
    const cartCountElements = document.querySelectorAll('#navbar-cart-count');
    
    cartCountElements.forEach(el => {
        el.textContent = count;
        el.style.opacity = count > 0 ? '1' : '0.3';
    });
}

// ============================================
// CART DISPLAY - UI RENDERING
// ============================================

function updateCartDisplay() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    if (!container) return;
    
    if (cart.length === 0) {
        container.style.display = 'none';
        emptyMessage.style.display = 'block';
        updateSummary();
        return;
    }
    
    container.style.display = 'grid';
    emptyMessage.style.display = 'none';
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item-card" data-item-id="${item.id}">
            <div class="cart-item-header">
                <h3>${item.name}</h3>
                <span class="item-category">${item.category}</span>
            </div>
            
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="qty-btn minus-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <input type="number" class="qty-input" value="${item.quantity}" 
                           onchange="updateCartItemQuantity('${item.id}', parseInt(this.value))">
                    <button class="qty-btn plus-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                
                <div class="cart-item-total">
                    <span class="total-label">Total:</span>
                    <span class="total-amount">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            
            <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remove item">
                ✕
            </button>
        </div>
    `).join('');
    
    updateSummary();
}

function updateSummary() {
    const cart = getCart();
    const subtotal = calculateCartSubtotal(cart);
    const tax = calculateTax(cart);
    const total = calculateCartTotal(cart);
    
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxEl = document.getElementById('summary-tax');
    const totalEl = document.getElementById('summary-total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// ============================================
// CHECKOUT FUNCTIONALITY
// ============================================

function handleCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = calculateCartTotal(cart);
    const itemCount = getCartItemCount();
    
    // Simulate checkout
    const confirmed = confirm(
        `Order Summary:\n` +
        `Items: ${itemCount}\n` +
        `Total: $${total.toFixed(2)}\n\n` +
        `Proceed with order?`
    );
    
    if (confirmed) {
        // Save order to history
        clearCart();
        alert('Thank you for your order! Your items will be ready soon.');
        window.location.href = 'index.html';
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// PAGE LOAD - INITIALIZE CART
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    updateNavbarCartCount();
    
    // If on cart page, display cart
    if (document.getElementById('cart-items-container')) {
        updateCartDisplay();
    }
    
    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Initialize recommendations if on cart page
    if (document.getElementById('recommendations-container')) {
        setTimeout(() => {
            if (typeof loadRecommendations === 'function') {
                loadRecommendations();
            }
        }, 500);
    }
});

// ============================================
// GLOBAL "ADD TO CART" BUTTON HANDLER
// ============================================

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const itemName = e.target.getAttribute('data-item-name');
        const itemPrice = e.target.getAttribute('data-item-price');
        const itemCategory = e.target.getAttribute('data-item-category');
        
        addToCart(itemName, itemPrice, itemCategory);
    }
});
