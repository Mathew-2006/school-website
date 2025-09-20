// Dashboard Functions Module
// Provides common functions used across dashboard pages

let currentUserId = null;
let currentUserData = null;

// Initialize dashboard
async function initializeDashboard() {
  try {
    // Initialize Firebase and auth
    await window.FirebaseConfig.initializeFirebase();
    await window.AuthService.initializeAuth();

    const user = window.AuthService.getCurrentUser();
    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    currentUserId = user.uid;

    // Load user data
    await loadUserData();

    // Update UI with user info
    updateUserInterface();

    // Initialize sidebar navigation
    initializeSidebarNavigation();

    // Initialize mobile responsiveness
    window.UI.initSidebarToggle();

  } catch (error) {
    console.error('Error initializing dashboard:', error);
    window.UI.showError('Failed to initialize dashboard');
  }
}

// Load user data from database
async function loadUserData() {
  try {
    const userData = await window.DatabaseService.getDocument('students', currentUserId);
    if (userData) {
      currentUserData = userData;
      return userData;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    window.UI.showError('Failed to load user data');
    return null;
  }
}

// Update user interface with user data
function updateUserInterface() {
  if (!currentUserData) return;

  // Update header user info
  const userEmailElement = document.getElementById('userEmail');
  const userInfoElement = document.getElementById('userInfo');

  if (userEmailElement) {
    userEmailElement.textContent = currentUserData.email || 'No email';
  }

  if (userInfoElement) {
    userInfoElement.innerHTML = `
      <span>Welcome, ${currentUserData.fullName || 'Student'}</span>
    `;
  }

  // Update profile section
  updateProfileSection();

  // Update units section
  updateUnitsSection();
}

// Update profile section with user data
function updateProfileSection() {
  if (!currentUserData) return;

  const elements = {
    fullName: document.getElementById('fullName'),
    regNo: document.getElementById('regNo'),
    studentClass: document.getElementById('studentClass'),
    gender: document.getElementById('gender'),
    dob: document.getElementById('dob'),
    email: document.getElementById('email')
  };

  if (elements.fullName) elements.fullName.textContent = currentUserData.fullName || 'Not set';
  if (elements.regNo) elements.regNo.textContent = currentUserData.regNo || 'Not set';
  if (elements.studentClass) elements.studentClass.textContent = currentUserData.class || 'Not set';
  if (elements.gender) elements.gender.textContent = currentUserData.gender || 'Not set';
  if (elements.dob) elements.dob.textContent = currentUserData.dob ? window.UI.formatDate(currentUserData.dob) : 'Not set';
  if (elements.email) elements.email.textContent = currentUserData.email || 'Not set';
}

// Update units section with user data
async function updateUnitsSection() {
  try {
    const currentUnitsElement = document.getElementById('currentUnits');
    const previousUnitsElement = document.getElementById('previousUnits');
    const unitsStatusElement = document.getElementById('unitsStatus');
    const unitsListElement = document.getElementById('unitsList');
    const noUnitsMessageElement = document.getElementById('noUnitsMessage');

    if (!currentUnitsElement || !previousUnitsElement) return;

    // Show loading state
    if (unitsStatusElement) unitsStatusElement.style.display = 'block';
    if (unitsListElement) unitsListElement.style.display = 'none';

    const currentUnits = currentUserData.currentUnits || 0;
    const previousUnits = currentUserData.previousUnits || 0;

    // Hide loading state
    if (unitsStatusElement) unitsStatusElement.style.display = 'none';

    if (currentUnits === 0 && previousUnits === 0) {
      // No units registered
      if (noUnitsMessageElement) noUnitsMessageElement.style.display = 'block';
      if (unitsListElement) unitsListElement.style.display = 'none';
    } else {
      // Show units
      if (noUnitsMessageElement) noUnitsMessageElement.style.display = 'none';
      if (unitsListElement) unitsListElement.style.display = 'block';

      // Display current units
      if (currentUnitsElement) {
        currentUnitsElement.innerHTML = currentUnits > 0
          ? `<p class="text-success">Currently registered for ${currentUnits} unit(s)</p>`
          : '<p class="text-muted">No current units registered</p>';
      }

      // Display previous units
      if (previousUnitsElement) {
        previousUnitsElement.innerHTML = previousUnits > 0
          ? `<p class="text-info">Previously registered for ${previousUnits} unit(s)</p>`
          : '<p class="text-muted">No previous units</p>';
      }
    }
  } catch (error) {
    console.error('Error updating units section:', error);
    window.UI.showError('Failed to load units information');
  }
}

// Initialize sidebar navigation
function initializeSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');

      if (section) {
        navigateToSection(section);
      }
    });
  });
}

// Navigate to specific section
function navigateToSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Show target section
  const targetSection = document.getElementById(`${sectionName}Section`);
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  // Update active sidebar link
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
  });

  const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Update page title
  const pageTitleElement = document.getElementById('pageTitle');
  if (pageTitleElement) {
    const titles = {
      profile: 'My Profile',
      units: 'My Units',
      notifications: 'Notifications'
    };
    pageTitleElement.textContent = titles[sectionName] || 'Dashboard';
  }
}

// Handle logout
async function handleLogout() {
  try {
    await window.AuthService.signOut();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error signing out:', error);
    window.UI.showError('Failed to sign out');
  }
}

// Show password change modal
function showPasswordModal() {
  window.UI.showModal('passwordModal');
}

// Handle password change
async function handlePasswordChange() {
  try {
    const newPassword = document.getElementById('newPassword').value;

    if (!newPassword || newPassword.length < 6) {
      window.UI.showError('Password must be at least 6 characters long');
      return;
    }

    await window.AuthService.updatePassword(newPassword);
    window.UI.showSuccess('Password updated successfully!');
    window.UI.closeModal('passwordModal');

    // Clear the form
    document.getElementById('newPassword').value = '';

  } catch (error) {
    console.error('Error changing password:', error);
    window.UI.showError(error.message || 'Failed to update password');
  }
}

// Show edit profile modal
function showEditProfileModal() {
  if (!currentUserData) return;

  // Populate form with current data
  const classInput = document.getElementById('editClass');
  const genderSelect = document.getElementById('editGender');
  const dobInput = document.getElementById('editDob');

  if (classInput) classInput.value = currentUserData.class || '';
  if (genderSelect) genderSelect.value = currentUserData.gender || '';
  if (dobInput) dobInput.value = currentUserData.dob || '';

  window.UI.showModal('editProfileModal');
}

// Handle profile update
async function handleProfileUpdate(event) {
  event.preventDefault();

  try {
    const classValue = document.getElementById('editClass').value;
    const genderValue = document.getElementById('editGender').value;
    const dobValue = document.getElementById('editDob').value;

    await window.DatabaseService.updateDocument('students', currentUserId, {
      class: classValue,
      gender: genderValue,
      dob: dobValue
    });

    window.UI.showSuccess('Profile updated successfully!');
    window.UI.closeModal('editProfileModal');

    // Reload user data and update UI
    await loadUserData();
    updateUserInterface();

  } catch (error) {
    console.error('Error updating profile:', error);
    window.UI.showError('Failed to update profile');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);
