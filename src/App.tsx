import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";

import ProtectionRoute from "./components/ProtectRoutes";
import AuthService from "./services/AuthService";
import Home from "./pages/Home";

function App() {
  const authServiceInstance = new AuthService();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SignIn authService={authServiceInstance} />}
          />

          <Route
            path="/home"
            element={
              <ProtectionRoute>
                <Home />
              </ProtectionRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
