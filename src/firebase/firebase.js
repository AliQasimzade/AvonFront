
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyB4SPQvP-sJYZUA-bkb-4a1DTPZIq57cXw",
    authDomain: "avon-azerbaijan.firebaseapp.com",
    projectId: "avon-azerbaijan",
    storageBucket: "avon-azerbaijan.appspot.com",
    messagingSenderId: "545180781435",
    appId: "1:545180781435:web:13492e6c05b7d5601d4bde",
    measurementId: "G-K8XMFZQ0FT",
  }

  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);