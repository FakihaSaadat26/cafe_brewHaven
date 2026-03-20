# ☕ Brew Haven Café Website

A fully functional, responsive café website built with HTML, CSS, and vanilla JavaScript. Modern UI/UX design with warm café theme colors.

---

## 📁 Project Structure

```
cafe_brewHaven/
├── index.html        # Homepage
├── menu.html         # Menu page with filtering
├── about.html        # About us page
├── contact.html      # Contact form & FAQ
├── styles.css        # All styling (responsive + dark mode)
├── script.js         # All interactivity
└── README.md         # This file
```

---

## 🚀 Quick Start

1. **Extract/Navigate to the project folder:**
   ```
   c:\Users\USER\Desktop\frintend\
   ```

2. **Open in a browser:**
   - Double-click `index.html` OR
   - Right-click → Open with → Your favorite browser

3. **That's it!** The website is fully functional with no backend needed.

---

## ✨ Features Implemented

### 1. **Homepage (index.html)**
- ✅ Hero section with background image and tagline
- ✅ Navigation bar (sticky)
- ✅ Featured items grid (4 items with images, prices)
- ✅ "Explore Menu" call-to-action button
- ✅ Benefits section (Why choose us)
- ✅ Footer with contact info

### 2. **Menu Page (menu.html)**
- ✅ Categorized menu items (Coffee, Tea, Desserts)
- ✅ 24 total menu items with descriptions and prices
- ✅ Category filter buttons (All, Coffee, Tea, Desserts)
- ✅ Smooth filtering with JavaScript
- ✅ Price display for each item
- ✅ Responsive grid layout

### 3. **About Page (about.html)**
- ✅ Café story and history
- ✅ Mission & Vision statements
- ✅ Core values section (4 values)
- ✅ Team member profiles
- ✅ Photo gallery section
- ✅ Call-to-action button

### 4. **Contact Page (contact.html)**
- ✅ Contact form with validation
- ✅ Form fields: Name, Email, Phone, Subject, Message
- ✅ Real-time form validation
- ✅ Success/error messages
- ✅ Contact information section
- ✅ Social media links
- ✅ FAQ section
- ✅ Hours & location display

### 5. **Styling (styles.css)**
- ✅ Warm café theme colors (brown, cream, beige)
- ✅ CSS Grid & Flexbox layouts
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode with toggle
- ✅ Smooth transitions and animations
- ✅ Accessible color contrast
- ✅ Google Fonts integration

### 6. **JavaScript Functionality (script.js)**
- ✅ Dark mode toggle (saved to localStorage)
- ✅ Menu filtering system
- ✅ Form validation with error messages
- ✅ Scroll-to-top button
- ✅ Sticky navigation bar
- ✅ Mobile hamburger menu
- ✅ Smooth scrolling
- ✅ Intersection Observer animations
- ✅ Real-time form field validation

---

## 🎨 Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Brown | #8B6F47 | Headings, buttons, accents |
| Secondary Tan | #D4A574 | Secondary accents |
| Accent Red | #C85A54 | CTAs, highlights |
| Background | #FFF8F3 | Main background |
| Light Background | #F5EFE7 | Card backgrounds |
| Text | #2C2C2C | Body text |

---

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 769px - 1199px
- **Mobile:** 480px - 768px
- **Small Mobile:** < 480px

All pages are fully responsive and tested on various screen sizes.

---

## 🎯 Form Validation Rules

### Name
- Required
- Minimum 2 characters

### Email
- Required
- Must be valid email format (contains @ and domain)

### Phone
- Optional
- If provided, must contain only digits, spaces, hyphens, or parentheses

### Subject
- Required
- Must select from dropdown list

### Message
- Required
- Minimum 10 characters

**Validation runs on:**
- Form submission
- Field blur (real-time feedback)

---

## 🌙 Dark Mode

- Click the moon icon (🌙) in the navbar to toggle dark mode
- Preference is saved to browser's localStorage
- All pages support dark mode automatically

---

## 📋 Menu Items

### Coffee (8 items)
Espresso, Americano, Latte, Cappuccino, Macchiato, Flat White, Iced Coffee, Caramel Macchiato

### Tea (6 items)
Earl Grey, Green Tea, Chamomile Honey, Matcha Latte, Iced Peach Tea, Peppermint Blend

### Desserts (8 items)
Chocolate Croissant, Almond Croissant, Blueberry Muffin, Carrot Cake Slice, Lemon Tart, Tiramisu Cup, Strawberry Cheesecake, Chocolate Brownie

---

## 🔧 JavaScript Functions Reference

### Dark Mode
```javascript
toggleDarkMode()          // Toggle dark mode on/off
enableDarkMode()          // Enable dark mode
disableDarkMode()         // Disable dark mode
```

### Menu Filtering
```javascript
filterMenu(e)             // Filter menu items by category
```

### Form Validation
```javascript
validateForm()            // Validate all form fields
handleFormSubmit(e)       // Handle form submission
showError(field, msg)     // Show error message
clearError(field)         // Clear error message
```

### Scroll
```javascript
// Scroll to top button visibility handled automatically
```

### Navigation
```javascript
updateActiveNavLink()     // Update active nav link based on page
```

---

## 🎬 Animations Included

- **Fade In Up:** Elements fade in and slide up on scroll
- **Hover Effects:** Buttons and cards lift on hover
- **Smooth Scrolling:** All links scroll smoothly
- **Menu Filter Animation:** Items fade in/out when filtering
- **Dark Mode Transition:** Smooth color transitions

---

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Customization Guide

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #8B6F47;        /* Change this */
    --secondary-color: #D4A574;      /* Change this */
    --accent-color: #C85A54;         /* Change this */
    /* ... */
}
```

### Add Menu Items
Edit `menu.html` and follow this pattern:
```html
<div class="menu-item" data-category="coffee">
    <div class="item-header">
        <h3>Item Name</h3>
        <span class="price">$X.XX</span>
    </div>
    <p class="item-description">Description here</p>
    <span class="category-badge">Category</span>
</div>
```

### Change Cafe Info
Update these sections in all HTML files:
- Café name in `.nav-brand`
- Contact info in footer
- Hours in footer and contact page
- Address and phone numbers

### Modify Fonts
Change Google Fonts import in HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update in `styles.css`:
```css
--heading-font: 'YourFont', serif;
```

---

## 🚀 Performance Tips

- All JavaScript is vanilla (no dependencies needed)
- CSS uses modern Grid/Flexbox (no framework)
- Optimized animations using CSS transforms
- Lazy loading ready for images
- Mobile-first responsive design

---

## 📱 Mobile Features

- ✅ Hamburger menu for mobile navigation
- ✅ Touch-friendly buttons and links
- ✅ Optimized form inputs for mobile keyboards
- ✅ Proper viewport meta tag
- ✅ Mobile-safe images and layouts

---

## ✅ Testing Checklist

- [x] All pages load without errors
- [x] Navigation works on all pages
- [x] Menu filtering works correctly
- [x] Form validation works
- [x] Dark mode toggles and persists
- [x] Scroll to top button appears
- [x] Mobile menu works
- [x] Responsive on all breakpoints
- [x] All links work
- [x] Smooth scrolling works

---

## 🐛 Known Issues & Solutions

**Issue:** Form not validating?
- **Solution:** Check browser console for errors. Ensure all form field IDs match.

**Issue:** Dark mode not saving?
- **Solution:** Check if localStorage is enabled in browser settings.

**Issue:** Images not showing?
- **Solution:** Add your own images to replace placeholder elements.

---

## 🎓 Learning Resources Used

- **HTML5:** Semantic markup, forms
- **CSS3:** Variables, Grid, Flexbox, Media Queries, Animations
- **JavaScript ES6+:** Event listeners, DOM manipulation, localStorage
- **Google Fonts:** Typography
- **Lottie Animations:** Optional animation library

---

## 📄 License

Free to use and modify. Built for educational and commercial purposes.

---

## 👨‍💻 About This Website

**Built with:** ❤️ using pure HTML, CSS, and JavaScript
**No frameworks or dependencies needed**
**Fully functional - Copy and run locally**

---

## 💡 Future Enhancement Ideas

1. Add online ordering system
2. Integrate with Google Maps API
3. Add real image gallery
4. Implement email notification on contact form
5. Add loyalty rewards program
6. Integrate payment gateway (Stripe/PayPal)
7. Add blog section
8. Add customer reviews/testimonials
9. Implement search functionality
10. Add cart system for orders

---

## 📞 Support

**Questions or issues?**
- Check the code comments
- Review the HTML structure
- Look at CSS variables for styling
- Check browser console for JavaScript errors

---

**Enjoy your Brew Haven Café Website! ☕✨**
