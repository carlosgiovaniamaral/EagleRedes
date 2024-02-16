import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthService from "./services/AuthService";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn authService={new AuthService()} />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
