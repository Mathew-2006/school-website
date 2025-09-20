# School Website Frontend

A modern, responsive, and modular frontend for the School Portal built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **Modern Design System**: Consistent styling with CSS custom properties
- **Responsive Layout**: Mobile-first design that works on all devices
- **Modular Architecture**: Reusable components and shared utilities
- **Firebase Integration**: Authentication and database services
- **Component-Based**: Easy to maintain and extend
- **Accessibility**: WCAG compliant with proper focus management
- **Performance Optimized**: Minimal dependencies and efficient loading

## 📁 Project Structure

```
school-website/
├── assets/
│   └── css/
│       └── main.css              # Main stylesheet with design system
├── components/
│   ├── header.html               # Reusable header component
│   ├── sidebar.html              # Navigation sidebar component
│   ├── profile-section.html      # User profile section
│   ├── units-section.html        # Units management section
│   ├── notifications-section.html # Notifications display
│   ├── password-modal.html       # Password change modal
│   └── edit-profile-modal.html   # Profile editing modal
├── utils/
│   ├── firebase-config.js        # Firebase initialization
│   ├── auth-service.js           # Authentication utilities
│   ├── database-service.js       # Database operations
│   ├── ui-components.js          # UI components and utilities
│   └── dashboard-functions.js    # Dashboard-specific functions
├── index-new.html                # Modern landing page
├── login-new.html                # Enhanced login page
├── register-new.html             # Improved registration page
├── dashboard-new.html            # New modular dashboard
└── README.md                     # This file
```

## 🎨 Design System

The project uses a comprehensive design system with:

- **CSS Custom Properties**: Consistent colors, spacing, and typography
- **Component Library**: Reusable HTML components
- **Responsive Breakpoints**: Mobile-first approach
- **Accessibility Features**: Focus management and screen reader support

### Color Palette
- Primary: `#3498db` (Blue)
- Secondary: `#2ecc71` (Green)
- Danger: `#e74c3c` (Red)
- Success: `#27ae60` (Green)
- Warning: `#f39c12` (Orange)

### Typography
- Font Family: Segoe UI, system fonts
- Responsive font sizes using CSS custom properties
- Consistent line heights and spacing

## 🛠️ Usage

### Quick Start

1. **Open the Landing Page**:
   ```bash
   open index-new.html
   ```

2. **Register a New Account**:
   - Click "Get Started" on the landing page
   - Fill out the registration form
   - Account will be created in Firebase

3. **Sign In**:
   - Use existing credentials or create new account
   - Redirects to dashboard after successful login

4. **Use the Dashboard**:
   - Navigate between Profile, Units, and Notifications
   - Edit profile information
   - Change password
   - View registered units

### Development

The project uses a modular architecture:

1. **Shared Utilities** (`utils/`):
   - Import Firebase modules
   - Authentication services
   - Database operations
   - UI components

2. **Reusable Components** (`components/`):
   - Include in HTML files using fetch API
   - Consistent styling and behavior
   - Easy to maintain and update

3. **Main Styles** (`assets/css/main.css`):
   - Design system variables
   - Base styles and utilities
   - Responsive design helpers

## 🔧 Customization

### Colors
Update CSS custom properties in `assets/css/main.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Components
Modify component HTML files in the `components/` directory and they will be automatically updated across all pages.

### Firebase Configuration
Update Firebase config in `utils/firebase-config.js`:
```javascript
const firebaseConfig = {
  // Your Firebase configuration
};
```

## 📱 Responsive Design

The frontend is fully responsive with breakpoints at:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

Features include:
- Collapsible sidebar on mobile
- Responsive forms and cards
- Touch-friendly buttons and inputs
- Optimized typography scaling

## ♿ Accessibility

The project follows WCAG 2.1 guidelines:
- Proper heading hierarchy
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 🔒 Security

- Firebase Authentication for secure login
- Input validation and sanitization
- XSS protection through proper escaping
- Secure password requirements
- Session management

## 🚀 Performance

- Minimal external dependencies
- Efficient CSS with custom properties
- Optimized JavaScript modules
- Lazy loading of components
- Compressed and optimized assets

## 📋 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Follow the existing code style and structure
2. Test on multiple devices and browsers
3. Ensure accessibility compliance
4. Update documentation for new features
5. Use semantic HTML and proper ARIA attributes

## 📄 License

This project is part of the School Website system. See the main project for licensing information.

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Test network connectivity
4. Review browser compatibility

## 🔄 Migration from Old Version

To migrate from the old HTML files:

1. **Backup existing files**
2. **Update links** in navigation to point to new files
3. **Test functionality** thoroughly
4. **Update Firebase security rules** if needed
5. **Train users** on new interface

### Key Changes:
- Modular component architecture
- Improved responsive design
- Enhanced accessibility
- Better error handling
- Modern UI/UX patterns

---

Built with ❤️ for the School Portal community
