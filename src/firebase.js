import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAV4riowYEVkWXs6_QDLgWngl9o2pHLE9A",
    authDomain: "travel-app-30287.firebaseapp.com",
    projectId: "travel-app-30287",
    storageBucket: "travel-app-30287.firebasestorage.app",
    messagingSenderId: "349411735052",
    appId: "1:349411735052:web:8d4a8402d03abc99242029",
    measurementId: "G-TE1NWMV46F"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
