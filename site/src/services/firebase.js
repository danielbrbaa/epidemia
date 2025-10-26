// site/src/services/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE,
  messagingSenderId: import.meta.env.VITE_FB_SENDER,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

// Se não houver variáveis do .env, usa fallback padrão
if (!firebaseConfig.apiKey) {
  Object.assign(firebaseConfig, {
    apiKey: "AIzaSyDksPJAn-Xz5EwSCfAqoyL2BR9hDTPaTsU",
    authDomain: "sim-epidemia.firebaseapp.com",
    projectId: "sim-epidemia",
    storageBucket: "sim-epidemia.appspot.com",
    messagingSenderId: "97463496465",
    appId: "1:97463496465:web:64849bbc8619d49e2ea6b0",
    measurementId: "G-G51Q8SB84R",
  });

  console.warn("⚠️ Usando fallback hardcoded. Configure o .env depois.");
}

// Garante inicialização única
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };
