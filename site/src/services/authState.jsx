import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase.js"; // 🔹 importa firebase corretamente

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const logout = async () => {
    await signOut(auth);
  };

  // Mostra tela de carregamento temporária enquanto verifica login
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Carregando...
      </div>
    );
  }

  // Return principal (onde o contexto é fornecido à aplicação)
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
