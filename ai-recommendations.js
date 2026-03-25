/* ============================================
   BREW HAVEN CAFÉ - AI/ML RECOMMENDATIONS ENGINE
   Personalized Suggestions & Smart Pairings
   ============================================ */

// ============================================
// MENU DATA
// ============================================

const MENU_DATA = {
    coffee: [
        { name: 'Espresso', price: 2.95, category: 'coffee', tags: ['strong', 'quick'] },
        { name: 'Americano', price: 3.45, category: 'coffee', tags: ['bold', 'classic'] },
        { name: 'Latte', price: 4.25, category: 'coffee', tags: ['smooth', 'creamy'] },
        { name: 'Cappuccino', price: 4.45, category: 'coffee', tags: ['rich', 'foamy'] },
        { name: 'Macchiato', price: 4.15, category: 'coffee', tags: ['strong', 'concentrated'] },
        { name: 'Flat White', price: 4.65, category: 'coffee', tags: ['smooth', 'velvety'] },
        { name: 'Iced Coffee', price: 3.95, category: 'coffee', tags: ['cold', 'refreshing'] },
        { name: 'Caramel Macchiato', price: 5.25, category: 'coffee', tags: ['sweet', 'indulgent'] }
    ],
    tea: [
        { name: 'Earl Grey', price: 3.50, category: 'tea', tags: ['classic', 'aromatic'] },
        { name: 'Green Tea', price: 3.45, category: 'tea', tags: ['light', 'delicate'] },
        { name: 'Chamomile Honey', price: 3.75, category: 'tea', tags: ['soothing', 'relaxing'] },
        { name: 'Matcha Latte', price: 5.45, category: 'tea', tags: ['energizing', 'creamy'] },
        { name: 'Iced Peach Tea', price: 4.25, category: 'tea', tags: ['fruity', 'refreshing'] },
        { name: 'Peppermint Blend', price: 3.95, category: 'tea', tags: ['minty', 'fresh'] }
    ],
    desserts: [
        { name: 'Chocolate Croissant', price: 4.75, category: 'desserts', tags: ['chocolate', 'pastry'] },
        { name: 'Almond Croissant', price: 5.25, category: 'desserts', tags: ['almond', 'pastry'] },
        { name: 'Blueberry Muffin', price: 4.50, category: 'desserts', tags: ['fruity', 'moist'] },
        { name: 'Carrot Cake Slice', price: 5.95, category: 'desserts', tags: ['spiced', 'cream-cheese'] },
        { name: 'Lemon Tart', price: 5.50, category: 'desserts', tags: ['citrus', 'tangy'] },
        { name: 'Tiramisu Cup', price: 6.75, category: 'desserts', tags: ['italian', 'espresso'] },
        { name: 'Strawberry Cheesecake', price: 6.50, category: 'desserts', tags: ['fruity', 'creamy'] },
        { name: 'Chocolate Brownie', price: 4.25, category: 'desserts', tags: ['chocolate', 'fudgy'] }
    ]
};

// Smart pairings - items that go well together
const SMART_PAIRINGS = {
    'Espresso': ['Chocolate Brownie', 'Chocolate Croissant', 'Almond Croissant'],
    'Latte': ['Blueberry Muffin', 'Chocolate Croissant', 'Carrot Cake Slice'],
    'Cappuccino': ['Chocolate Brownie', 'Lemon Tart', 'Almond Croissant'],
    'Americano': ['Chocolate Croissant', 'Lemon Tart', 'Blueberry Muffin'],
    'Iced Coffee': ['Strawberry Cheesecake', 'Blueberry Muffin', 'Chocolate Brownie'],
    'Earl Grey': ['Lemon Tart', 'Almond Croissant', 'Blueberry Muffin'],
    'Green Tea': ['Lemon Tart', 'Almond Croissant', 'Strawberry Cheesecake'],
    'Matcha Latte': ['Strawberry Cheesecake', 'Almond Croissant', 'Blueberry Muffin']
};

// ============================================
// ML RECOMMENDATION ENGINE
// ============================================

/**
 * Calculate similarity between two items based on tags
 */
function calculateSimilarity(item1, item2) {
    const tags1 = new Set(item1.tags);
    const tags2 = new Set(item2.tags);
    
    const intersection = [...tags1].filter(tag => tags2.has(tag)).length;
    const union = new Set([...tags1, ...tags2]).size;
    
    return intersection / union;
}

/**
 * Get all menu items
 */
function getAllMenuItems() {
    return [
        ...MENU_DATA.coffee,
        ...MENU_DATA.tea,
        ...MENU_DATA.desserts
    ];
}

/**
 * Get smart recommendations based on cart contents
 */
function getSmartRecommendations() {
    const cart = getCart();
    const prefs = getUserPreferences();
    
    if (cart.length === 0) {
        // Return popular/trending items if cart is empty
        return getTrendingRecommendations();
    }
    
    const recommendations = new Set();
    
    // 1. Smart Pairings - items that complement current cart
    cart.forEach(item => {
        if (SMART_PAIRINGS[item.name]) {
            SMART_PAIRINGS[item.name].forEach(pairing => {
                if (pairing !== item.name) {
                    recommendations.add(pairing);
                }
            });
        }
    });
    
    // 2. Similarity-based recommendations
    const allItems = getAllMenuItems();
    cart.forEach(cartItem => {
        const similarItems = allItems
            .map(item => ({
                ...item,
                similarity: calculateSimilarity(cartItem, item)
            }))
            .filter(item => item.similarity > 0.5 && item.name !== cartItem.name)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);
        
        similarItems.forEach(item => recommendations.add(item.name));
    });
    
    // 3. Category diversity - suggest from underrepresented categories
    const cartCategories = new Set(cart.map(item => item.category));
    if (cartCategories.size < 3) {
        const missingCategories = Object.keys(MENU_DATA)
            .filter(cat => !cartCategories.has(cat));
        
        missingCategories.forEach(cat => {
            const randomItem = MENU_DATA[cat][Math.floor(Math.random() * MENU_DATA[cat].length)];
            recommendations.add(randomItem.name);
        });
    }
    
    // Convert to array and get item details, then remove items already in cart
    const cartItemNames = new Set(cart.map(item => item.name));
    const recommendationArray = Array.from(recommendations)
        .filter(name => !cartItemNames.has(name))
        .map(name => {
            const allItems = getAllMenuItems();
            return allItems.find(item => item.name === name);
        })
        .filter(item => item !== undefined)
        .slice(0, 4);
    
    return recommendationArray;
}

/**
 * Get trending/popular recommendations
 */
function getTrendingRecommendations() {
    const featured = [
        { name: 'Classic Espresso', price: 3.50, category: 'coffee', tags: ['strong', 'quick'] },
        { name: 'Caramel Macchiato', price: 5.25, category: 'coffee', tags: ['sweet', 'indulgent'] },
        { name: 'Tiramisu Cup', price: 6.75, category: 'desserts', tags: ['italian', 'espresso'] },
        { name: 'Latte', price: 4.25, category: 'coffee', tags: ['smooth', 'creamy'] }
    ];
    
    return featured;
}

/**
 * Get personalized recommendations based on user history
 */
function getPersonalizedRecommendations() {
    const prefs = getUserPreferences();
    const allItems = getAllMenuItems();
    
    // Find user's favorite category
    let favoriteCategory = null;
    let maxCount = 0;
    
    for (const [category, count] of Object.entries(prefs.preferences)) {
        if (count > maxCount) {
            maxCount = count;
            favoriteCategory = category;
        }
    }
    
    if (favoriteCategory && MENU_DATA[favoriteCategory]) {
        return MENU_DATA[favoriteCategory]
            .filter(item => !prefs.viewedItems.includes(item.name))
            .slice(0, 4);
    }
    
    return getTrendingRecommendations();
}

// ============================================
// USER ANALYTICS
// ============================================

/**
 * Get user's favorite category
 */
function getUserFavoriteCategory() {
    const prefs = getUserPreferences();
    
    let favorite = null;
    let maxCount = 0;
    
    for (const [category, count] of Object.entries(prefs.preferences)) {
        if (count > maxCount) {
            maxCount = count;
            favorite = category;
        }
    }
    
    return favorite || 'Not determined yet';
}

/**
 * Get most ordered item
 */
function getMostOrderedItem() {
    const prefs = getUserPreferences();
    
    if (prefs.cartHistory.length === 0) {
        return 'No orders yet';
    }
    
    const itemCounts = {};
    
    prefs.cartHistory.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    
    let mostOrdered = null;
    let maxCount = 0;
    
    for (const [item, count] of Object.entries(itemCounts)) {
        if (count > maxCount) {
            maxCount = count;
            mostOrdered = item;
        }
    }
    
    return mostOrdered || 'None';
}

/**
 * Get average spending
 */
function getAverageSpending() {
    const prefs = getUserPreferences();
    
    if (prefs.cartHistory.length === 0) {
        return '$0.00';
    }
    
    const totalSpend = prefs.cartHistory.reduce((sum, order) => sum + order.total, 0);
    const average = totalSpend / prefs.cartHistory.length;
    
    return `$${average.toFixed(2)}`;
}

/**
 * Get lifetime savings (estimated discount)
 */
function getLifetimeSavings() {
    const prefs = getUserPreferences();
    
    // Estimate 5% savings per order for being a regular customer
    if (prefs.cartHistory.length < 3) {
        return '$0.00';
    }
    
    const totalSpend = prefs.cartHistory.reduce((sum, order) => sum + order.total, 0);
    const estimatedSavings = totalSpend * 0.05;
    
    return `$${estimatedSavings.toFixed(2)}`;
}

// ============================================
// UI RENDERING - RECOMMENDATIONS
// ============================================

/**
 * Load and display recommendations on cart page
 */
function loadRecommendations() {
    const container = document.getElementById('recommendations-container');
    if (!container) return;
    
    const recommendations = getSmartRecommendations();
    
    if (recommendations.length === 0) {
        container.innerHTML = '<p class="no-recommendations">Browse more items to get personalized recommendations!</p>';
        return;
    }
    
    container.innerHTML = recommendations.map(item => `
        <div class="recommendation-item">
            <div class="recommendation-header">
                <h4>${item.name}</h4>
                <span class="recommendation-price">$${item.price.toFixed(2)}</span>
            </div>
            <p class="recommendation-category">${item.category}</p>
            <button class="add-to-cart-btn recommendation-add-btn" 
                    data-item-name="${item.name}" 
                    data-item-price="${item.price}" 
                    data-item-category="${item.category}">
                Add to Cart
            </button>
        </div>
    `).join('');
}

/**
 * Load and display user analytics
 */
function loadAnalytics() {
    const favoriteEl = document.getElementById('favorite-category');
    const mostOrderedEl = document.getElementById('most-ordered');
    const avgSpendEl = document.getElementById('avg-spend');
    const savingsEl = document.getElementById('lifetime-savings');
    
    if (favoriteEl) favoriteEl.textContent = getUserFavoriteCategory();
    if (mostOrderedEl) mostOrderedEl.textContent = getMostOrderedItem();
    if (avgSpendEl) avgSpendEl.textContent = getAverageSpending();
    if (savingsEl) savingsEl.textContent = getLifetimeSavings();
}

// ============================================
// INITIALIZE AI FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load recommendations if on cart page
    if (document.getElementById('recommendations-container')) {
        setTimeout(loadRecommendations, 300);
    }
    
    // Load analytics if on cart page
    if (document.getElementById('favorite-category')) {
        setTimeout(loadAnalytics, 300);
    }
});

// Update recommendations when cart changes
document.addEventListener('cartUpdated', () => {
    loadRecommendations();
});
