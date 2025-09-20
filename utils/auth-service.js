// Authentication Service Module
// Provides common authentication functions used across the application

class AuthService {
  constructor() {
    this.currentUser = null;
    this.authStateListener = null;
  }

  // Initialize authentication and set up auth state listener
  async initializeAuth() {
    const { auth } = await window.FirebaseConfig.initializeFirebase();

    return new Promise((resolve) => {
      this.authStateListener = auth.onAuthStateChanged((user) => {
        this.currentUser = user;
        resolve(user);
      });
    });
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Sign out user
  async signOut() {
    const { auth } = await window.FirebaseConfig.initializeFirebase();
    await auth.signOut();
    this.currentUser = null;
  }

  // Update user password
  async updatePassword(newPassword) {
    const { auth } = await window.FirebaseConfig.initializeFirebase();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user is currently signed in');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    await auth.updatePassword(user, newPassword);
  }

  // Clean up auth state listener
  cleanup() {
    if (this.authStateListener) {
      this.authStateListener();
    }
  }
}

// Create singleton instance
const authService = new AuthService();

// Export to global scope
window.AuthService = authService;
