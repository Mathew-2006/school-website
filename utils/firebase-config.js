// Firebase Configuration Module
// This module provides centralized Firebase configuration and initialization

const firebaseConfig = {
  apiKey: "AIzaSyB5_DYPwO8KMPFodQnwH-o9_Z4kYwwjVWE",
  authDomain: "school-website-1a24c.firebaseapp.com",
  projectId: "school-website-1a24c",
  storageBucket: "school-website-1a24c.firebasestorage.app",
  messagingSenderId: "235324084724",
  appId: "1:235324084724:web:58b1945a75bf21da90e9a1",
  measurementId: "G-JGR7GRPL08"
};

// Initialize Firebase App
let firebaseApp = null;
let auth = null;
let db = null;

function initializeFirebase() {
  if (!firebaseApp) {
    // Import Firebase modules dynamically
    return Promise.all([
      import("https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js")
    ]).then(([firebase]) => {
      firebaseApp = firebase.initializeApp(firebaseConfig);
      auth = firebase.getAuth(firebaseApp);
      db = firebase.getFirestore(firebaseApp);
      return { app: firebaseApp, auth, db };
    });
  }
  return Promise.resolve({ app: firebaseApp, auth, db });
}

// Export functions for use in other modules
window.FirebaseConfig = {
  initializeFirebase,
  getAuth: () => auth,
  getDb: () => db,
  getConfig: () => firebaseConfig
};
