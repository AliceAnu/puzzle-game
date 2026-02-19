import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGjOWlNuKmn1lM57XcqZF3Ms_svvAzc1I",
  authDomain: "daily-puzzle-game-abf60.firebaseapp.com",
  projectId: "daily-puzzle-game-abf60",
  storageBucket: "daily-puzzle-game-abf60.firebasestorage.app",
  messagingSenderId: "510554353927",
  appId: "1:510554353927:web:fc4c6c1f0993c8f43b15a2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
