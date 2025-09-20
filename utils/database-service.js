// Database Service Module
// Provides common database operations used across the application

class DatabaseService {
  constructor() {
    this.db = null;
  }

  // Initialize database connection
  async initializeDb() {
    if (!this.db) {
      const { db } = await window.FirebaseConfig.initializeFirebase();
      this.db = db;
    }
    return this.db;
  }

  // Get document from collection
  async getDocument(collectionName, docId) {
    const db = await this.initializeDb();
    const docRef = db.collection(collectionName).doc(docId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  }

  // Set document in collection
  async setDocument(collectionName, docId, data) {
    const db = await this.initializeDb();
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.set(data);
    return docId;
  }

  // Update document in collection
  async updateDocument(collectionName, docId, data) {
    const db = await this.initializeDb();
    const docRef = db.collection(collectionName).doc(docId);
    await docRef.update(data);
    return docId;
  }

  // Get all documents from collection
  async getCollection(collectionName) {
    const db = await this.initializeDb();
    const querySnapshot = await db.collection(collectionName).get();
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }

  // Add document to collection
  async addDocument(collectionName, data) {
    const db = await this.initializeDb();
    const docRef = await db.collection(collectionName).add(data);
    return docRef.id;
  }

  // Delete document from collection
  async deleteDocument(collectionName, docId) {
    const db = await this.initializeDb();
    await db.collection(collectionName).doc(docId).delete();
    return docId;
  }

  // Query documents with conditions
  async queryCollection(collectionName, field, operator, value) {
    const db = await this.initializeDb();
    const querySnapshot = await db.collection(collectionName)
      .where(field, operator, value)
      .get();

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

// Export to global scope
window.DatabaseService = databaseService;
