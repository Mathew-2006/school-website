// UI Components Module
// Provides reusable UI components and utilities

class UIComponents {
  // Show/hide loading spinner
  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<div class="text-center"><div class="spinner"></div></div>';
    }
  }

  hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  }

  // Show success message
  showSuccess(message, duration = 3000) {
    this.showAlert(message, 'success', duration);
  }

  // Show error message
  showError(message, duration = 5000) {
    this.showAlert(message, 'error', duration);
  }

  // Show info message
  showInfo(message, duration = 3000) {
    this.showAlert(message, 'info', duration);
  }

  // Generic alert function
  showAlert(message, type = 'info', duration = 3000) {
    const alertId = 'alert-' + Date.now();
    const alertHtml = `
      <div id="${alertId}" class="alert alert-${type} fade-in" style="
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      ">
        ${message}
      </div>
    `;

    // Add color based on type
    let backgroundColor = '#3498db'; // info
    if (type === 'success') backgroundColor = '#2ecc71';
    if (type === 'error') backgroundColor = '#e74c3c';
    if (type === 'warning') backgroundColor = '#f39c12';

    document.body.insertAdjacentHTML('beforeend', alertHtml);

    const alertElement = document.getElementById(alertId);
    if (alertElement) {
      alertElement.style.backgroundColor = backgroundColor;

      // Auto remove after duration
      setTimeout(() => {
        if (alertElement) {
          alertElement.style.opacity = '0';
          alertElement.style.transform = 'translateX(100%)';
          setTimeout(() => alertElement.remove(), 300);
        }
      }, duration);
    }
  }

  // Create modal
  createModal(modalId, title, content, options = {}) {
    const modalHtml = `
      <div id="${modalId}" class="modal ${options.show ? 'show' : ''}">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="UI.closeModal('${modalId}')">&times;</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${options.footer ? `
            <div class="modal-footer">
              ${options.footer}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // Show modal
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  // Hide modal
  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  }

  // Close modal (alias for hide)
  closeModal(modalId) {
    this.hideModal(modalId);
  }

  // Create form field
  createFormField(type, name, label, options = {}) {
    const fieldId = `field-${name}-${Date.now()}`;
    let fieldHtml = '';

    if (type === 'text' || type === 'email' || type === 'password') {
      fieldHtml = `
        <div class="form-group">
          <label for="${fieldId}" class="form-label">${label}</label>
          <input type="${type}" id="${fieldId}" name="${name}"
                 class="form-input" ${options.required ? 'required' : ''}
                 ${options.placeholder ? `placeholder="${options.placeholder}"` : ''}
                 ${options.value ? `value="${options.value}"` : ''}>
        </div>
      `;
    } else if (type === 'select') {
      fieldHtml = `
        <div class="form-group">
          <label for="${fieldId}" class="form-label">${label}</label>
          <select id="${fieldId}" name="${name}" class="form-select" ${options.required ? 'required' : ''}>
            ${options.options ? options.options.map(opt =>
              `<option value="${opt.value}" ${opt.selected ? 'selected' : ''}>${opt.label}</option>`
            ).join('') : ''}
          </select>
        </div>
      `;
    } else if (type === 'textarea') {
      fieldHtml = `
        <div class="form-group">
          <label for="${fieldId}" class="form-label">${label}</label>
          <textarea id="${fieldId}" name="${name}" class="form-textarea"
                    rows="${options.rows || 4}" ${options.required ? 'required' : ''}
                    ${options.placeholder ? `placeholder="${options.placeholder}"` : ''}>${options.value || ''}</textarea>
        </div>
      `;
    }

    return fieldHtml;
  }

  // Create button
  createButton(text, type = 'primary', options = {}) {
    const buttonId = options.id ? `id="${options.id}"` : '';
    const disabled = options.disabled ? 'disabled' : '';
    const onclick = options.onclick ? `onclick="${options.onclick}"` : '';

    return `<button class="btn btn-${type}" ${buttonId} ${disabled} ${onclick}>${text}</button>`;
  }

  // Toggle sidebar on mobile
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }

  // Initialize sidebar toggle functionality
  initSidebarToggle() {
    // Add mobile menu button if it doesn't exist
    const header = document.querySelector('.main-header');
    if (header && !document.querySelector('.mobile-menu-btn')) {
      const menuBtn = document.createElement('button');
      menuBtn.className = 'mobile-menu-btn btn btn-outline';
      menuBtn.innerHTML = '☰';
      menuBtn.onclick = () => this.toggleSidebar();
      header.insertBefore(menuBtn, header.firstChild);
    }
  }

  // Format date for display
  formatDate(date, options = {}) {
    if (!date) return '';

    const d = new Date(date);
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return d.toLocaleDateString('en-US', { ...defaultOptions, ...options });
  }

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Debounce function for search inputs
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
      errors: [
        ...(password.length < minLength ? ['At least 6 characters'] : []),
        ...(!hasUpperCase ? ['At least one uppercase letter'] : []),
        ...(!hasLowerCase ? ['At least one lowercase letter'] : []),
        ...(!hasNumbers ? ['At least one number'] : [])
      ]
    };
  }
}

// Create singleton instance
const uiComponents = new UIComponents();

// Export to global scope
window.UI = uiComponents;
