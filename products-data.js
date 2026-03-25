/* ============================================
   BREW HAVEN CAFÉ - PRODUCTS DATABASE
   Product data with metadata for loading
   ============================================ */

const PRODUCTS = [
    // Coffee Category
    {
        id: 'espresso',
        name: 'Espresso',
        price: 2.95,
        category: 'coffee',
        description: 'Single or double shot of our signature espresso blend. Bold, rich, and full-bodied.',
        badge: 'classic',
        tags: ['strong', 'rich', 'authentic']
    },
    {
        id: 'americano',
        name: 'Americano',
        price: 3.45,
        category: 'coffee',
        description: 'Smooth espresso topped with hot water. A classic favorite with bold flavor.',
        badge: null,
        tags: ['bold', 'smooth', 'classic']
    },
    {
        id: 'latte',
        name: 'Latte',
        price: 4.25,
        category: 'coffee',
        description: 'Espresso with silky steamed milk. Smooth, creamy, and perfectly balanced.',
        badge: 'popular',
        tags: ['creamy', 'smooth', 'balanced']
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        price: 4.45,
        category: 'coffee',
        description: 'Equal parts espresso, steamed milk, and foam. Rich and creamy texture.',
        badge: 'popular',
        tags: ['creamy', 'rich', 'traditional']
    },
    {
        id: 'macchiato',
        name: 'Macchiato',
        price: 4.15,
        category: 'coffee',
        description: 'Espresso "stained" with a touch of milk foam. Concentrated and bold.',
        badge: null,
        tags: ['strong', 'concentrated', 'bold']
    },
    {
        id: 'flat-white',
        name: 'Flat White',
        price: 4.65,
        category: 'coffee',
        description: 'Velvety microfoam over espresso. Silky smooth with rich coffee flavor.',
        badge: 'new',
        tags: ['smooth', 'velvety', 'premium']
    },
    {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        price: 3.95,
        category: 'coffee',
        description: 'Cold brew or iced espresso with milk and ice. Refreshing and smooth.',
        badge: null,
        tags: ['refreshing', 'cold', 'smooth']
    },
    {
        id: 'caramel-macchiato',
        name: 'Caramel Macchiato',
        price: 5.25,
        category: 'coffee',
        description: 'Soft caramel, velvety milk, espresso, and caramel drizzle. Sweet and indulgent.',
        badge: 'popular',
        tags: ['sweet', 'indulgent', 'caramel']
    },
    {
        id: 'mocha',
        name: 'Mocha',
        price: 5.45,
        category: 'coffee',
        description: 'Rich espresso combined with steamed milk and decadent chocolate. A chocolate lover\'s dream.',
        badge: 'new',
        tags: ['chocolate', 'rich', 'indulgent']
    },
    {
        id: 'vanilla-latte',
        name: 'Vanilla Latte',
        price: 4.75,
        category: 'coffee',
        description: 'Smooth latte infused with Madagascar vanilla. Creamy and aromatic.',
        badge: null,
        tags: ['vanilla', 'creamy', 'aromatic']
    },

    // Tea Category
    {
        id: 'earl-grey',
        name: 'Earl Grey',
        price: 3.50,
        category: 'tea',
        description: 'Classic black tea with bergamot. Aromatic and soothing.',
        badge: 'classic',
        tags: ['soothing', 'aromatic', 'classic']
    },
    {
        id: 'green-tea',
        name: 'Green Tea',
        price: 3.45,
        category: 'tea',
        description: 'Delicate green tea with notes of jasmine. Refreshing and light.',
        badge: null,
        tags: ['light', 'refreshing', 'healthy']
    },
    {
        id: 'chamomile-honey',
        name: 'Chamomile Honey',
        price: 3.75,
        category: 'tea',
        description: 'Soothing chamomile sweetened with local honey. Perfect for relaxation.',
        badge: null,
        tags: ['soothing', 'sweet', 'relaxing']
    },
    {
        id: 'matcha-latte',
        name: 'Matcha Latte',
        price: 5.45,
        category: 'tea',
        description: 'Vibrant green matcha powder whisked with steamed milk. Creamy and energizing.',
        badge: 'popular',
        tags: ['energizing', 'creamy', 'premium']
    },
    {
        id: 'iced-peach-tea',
        name: 'Iced Peach Tea',
        price: 4.25,
        category: 'tea',
        description: 'Refreshing black tea with peach flavor. Perfect summer drink.',
        badge: null,
        tags: ['refreshing', 'fruity', 'summer']
    },
    {
        id: 'peppermint-blend',
        name: 'Peppermint Blend',
        price: 3.95,
        category: 'tea',
        description: 'Fresh peppermint leaves with herbal blend. Cool, minty, and refreshing.',
        badge: null,
        tags: ['refreshing', 'minty', 'herbal']
    },
    {
        id: 'hibiscus-tea',
        name: 'Hibiscus Tea',
        price: 4.15,
        category: 'tea',
        description: 'Tart and floral hibiscus tea. A vibrant, colorful beverage with antioxidants.',
        badge: 'new',
        tags: ['floral', 'tart', 'colorful']
    },

    // Desserts Category
    {
        id: 'chocolate-croissant',
        name: 'Chocolate Croissant',
        price: 4.75,
        category: 'desserts',
        description: 'Buttery pastry with premium dark chocolate filling. Made fresh daily.',
        badge: null,
        tags: ['chocolate', 'buttery', 'fresh']
    },
    {
        id: 'vanilla-cupcake',
        name: 'Vanilla Cupcake',
        price: 3.95,
        category: 'desserts',
        description: 'Fluffy vanilla cupcake topped with creamy vanilla frosting and sprinkles.',
        badge: null,
        tags: ['vanilla', 'fluffy', 'sweet']
    },
    {
        id: 'strawberry-cheesecake',
        name: 'Strawberry Cheesecake',
        price: 5.95,
        category: 'desserts',
        description: 'Rich and creamy cheesecake with fresh strawberry topping. Pure indulgence.',
        badge: 'popular',
        tags: ['creamy', 'fruity', 'premium']
    },
    {
        id: 'double-chocolate-brownie',
        name: 'Double Chocolate Brownie',
        price: 4.45,
        category: 'desserts',
        description: 'Fudgy chocolate brownie with a chocolatey fudge center. Decadent and satisfying.',
        badge: 'popular',
        tags: ['chocolate', 'fudgy', 'decadent']
    },
    {
        id: 'blueberry-muffin',
        name: 'Blueberry Muffin',
        price: 3.65,
        category: 'desserts',
        description: 'Tender muffin loaded with fresh blueberries. A timeless classic.',
        badge: null,
        tags: ['fruity', 'fresh', 'classic']
    },
    {
        id: 'almond-biscotti',
        name: 'Almond Biscotti',
        price: 3.45,
        category: 'desserts',
        description: 'Crispy Italian almond biscotti. Perfect for dunking in your favorite beverage.',
        badge: null,
        tags: ['crunchy', 'almond', 'traditional']
    },
    {
        id: 'lemon-tart',
        name: 'Lemon Tart',
        price: 5.25,
        category: 'desserts',
        description: 'Zesty lemon filling in a buttery pastry shell. Tangy and delightful.',
        badge: 'new',
        tags: ['citrus', 'zesty', 'tangy']
    },
    {
        id: 'pistachio-macaron',
        name: 'Pistachio Macaron',
        price: 2.95,
        category: 'desserts',
        description: 'Delicate French macaron with pistachio flavor. Light, airy, and elegant.',
        badge: null,
        tags: ['nutty', 'delicate', 'elegant']
    },
    {
        id: 'chocolate-ganache-cake',
        name: 'Chocolate Ganache Cake',
        price: 6.45,
        category: 'desserts',
        description: 'Layers of moist chocolate cake with silky chocolate ganache. Absolutely divine.',
        badge: 'new',
        tags: ['chocolate', 'rich', 'premium']
    },
    {
        id: 'carrot-cake',
        name: 'Carrot Cake',
        price: 4.85,
        category: 'desserts',
        description: 'Moist carrot cake with cream cheese frosting. Naturally sweet and wholesome.',
        badge: null,
        tags: ['fruity', 'wholesome', 'creamy']
    }
];

// Simulate fetching products with delay
function loadProducts(delay = 2500) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, delay);
    });
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.category === category);
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Sort products
function sortProducts(products, sortType) {
    const sorted = [...products];
    switch (sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'popular':
            // Products with 'popular' badge first
            return sorted.sort((a, b) => {
                if (a.badge === 'popular') return -1;
                if (b.badge === 'popular') return 1;
                return 0;
            });
        default:
            return sorted;
    }
}
