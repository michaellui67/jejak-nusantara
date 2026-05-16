// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyB8X2Q1lX4Q5V2X2Q1lX4Q5V2X2Q1lX4Q5V2X2Q",
  authDomain: "jejak-nusantara.firebaseapp.com",
  projectId: "jejak-nusantara",
  storageBucket: "jejak-nusantara.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firebase authentication functions
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Firestore functions for saving passport data
export const savePassportData = async (userId: string, collectedStamps: any[]) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      collectedStamps,
      lastUpdated: new Date()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving passport data:", error);
    throw error;
  }
};

export const loadPassportData = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading passport data:", error);
    throw error;
  }
};

export const addStampToCloud = async (userId: string, stampData: any) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      collectedStamps: arrayUnion(stampData),
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error("Error adding stamp to cloud:", error);
    throw error;
  }
};