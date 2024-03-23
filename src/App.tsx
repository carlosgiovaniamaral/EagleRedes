import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import AuthService from "./auth/AuthService";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn authService={new AuthService()} />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();
    // Configurando a persistência de autenticação para "local"
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Lidar com a alteração de autenticação do usuário
        onAuthStateChanged(auth, (user) => {
          setIsAuthenticated(!!user); // true se o usuário estiver autenticado, caso contrário, false
        });
      })
      .catch((error) => {
        console.error(
          "Erro ao configurar a persistência de autenticação:",
          error.message
        );
      });
  }, []);

  if (isAuthenticated === null) {
    // Se ainda estiver verificando a autenticação, pode renderizar um loader ou uma tela de carregamento
    return <div>Loading...</div>;
  }

  return isAuthenticated ? ( // Se o usuário estiver autenticado, renderize os filhos
    <>{children}</>
  ) : (
    // Se o usuário não estiver autenticado, redirecione para a página de login
    <Navigate to="/" replace />
  );
}

export default App;
