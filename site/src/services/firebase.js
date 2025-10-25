// site/src/services/firebase.js
<<<<<<< HEAD
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

=======
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE,
  messagingSenderId: import.meta.env.VITE_FB_SENDER,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
<<<<<<< HEAD
}

// Debug seguro (não loga a chave inteira)
if (!firebaseConfig.apiKey) {
  console.error("Firebase: apiKey ausente. Confira site/.env e reinicie `npm run dev`.")
}

// (opcional) fallback TEMPORÁRIO para testar rapidamente
// Remova depois que o .env estiver ok
=======
};

// Fallback temporário
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
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
<<<<<<< HEAD
  console.warn("Usando fallback hardcoded. Ajuste o .env e remova este bloco.")
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
=======
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
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
