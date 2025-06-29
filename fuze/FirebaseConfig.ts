import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj8QFMKAl6cb1zoJhVIPsqlujs6u2L3_g",
  authDomain: "fuze-75b33.firebaseapp.com",
  projectId: "fuze-75b33",
  storageBucket: "fuze-75b33.appspot.com", // fixed typo: was 'firebasestorage.app'
  messagingSenderId: "353557743625",
  appId: "1:353557743625:web:6d8b5f574d18ae7c1310d8",
  measurementId: "G-TLBS73D2J0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Only use getAnalytics on web (not supported on React Native)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});