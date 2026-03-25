/* ============================================
   MENU LOADER - DYNAMIC SLOW LOADING
   Progressively renders menu items with animations
   ============================================ */

let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';
let allProducts = [];

document.addEventListener('DOMContentLoaded', initializeMenuLoader);

async function initializeMenuLoader() {
    // Show loading overlay initially
    showLoadingOverlay();
    
    try {
        // Load products with delay (2.5 seconds)
        console.log('Starting product load...');
        allProducts = await loadProducts(2500);
        console.log('Products loaded:', allProducts.length);
        
        // Hide loading overlay
        hideLoadingOverlay();
        
        // Render initial products
        displayProducts(allProducts);
        
        // Setup event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error loading products:', error);
        hideLoadingOverlay();
    }
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
}

function displayProducts(products) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    if (products.length === 0) {
        menuGrid.innerHTML = '<div class="no-results"><p>No products found. Try adjusting your filters.</p></div>';
        updateResultsCount(0);
        return;
    }
    
    // Stagger the rendering with delays
    products.forEach((product, index) => {
        setTimeout(() => {
            const productElement = createProductElement(product);
            menuGrid.appendChild(productElement);
            
            // Trigger animation
            setTimeout(() => {
                productElement.classList.add('loaded');
            }, 10);
        }, index * 80); // 80ms delay between each product
    });
    
    updateResultsCount(products.length);
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'menu-item-dynamic';
    div.innerHTML = `
        <div class="menu-item">
            <div class="item-badge-container">
                ${product.badge ? `<span class="item-badge" data-badge="${product.badge}">${product.badge}</span>` : ''}
            </div>
            <div class="item-header">
                <h3>${product.name}</h3>
                <span class="price">$${product.price.toFixed(2)}</span>
            </div>
            <p class="item-description">${product.description}</p>
            <span class="category-badge">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
            <button class="add-to-cart-btn" data-item-name="${product.name}" data-item-price="${product.price}" data-item-category="${product.category}">🛒 Add to Cart</button>
        </div>
    `;
    return div;
}

function updateResultsCount(count) {
    const resultsInfo = document.getElementById('resultsCount');
    if (resultsInfo) {
        resultsInfo.textContent = `${count} item${count !== 1 ? 's' : ''} found`;
    }
}

function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

function handleFilterChange(e) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    e.target.style.animation = 'scaleIn 0.3s ease-out';
    
    // Update filter
    currentFilter = e.target.getAttribute('data-filter');
    applyFiltersAndSort();
}

function handleSearch(e) {
    currentSearch = e.target.value;
    applyFiltersAndSort();
}

function handleSort(e) {
    currentSort = e.target.value;
    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    // Start with all products
    let filtered = allProducts;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    // Apply search
    if (currentSearch) {
        const lowerSearch = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.description.toLowerCase().includes(lowerSearch)
        );
    }
    
    // Apply sort
    if (currentSort !== 'default' && currentSort !== '') {
        filtered = sortProducts(filtered, currentSort);
    }
    
    // Display filtered and sorted products
    displayProducts(filtered);
}

// Badge styles mapping
const badgeStyles = {
    'popular': '⭐ Popular',
    'new': '✨ New',
    'classic': '🏆 Classic'
};
