import React from "react";
import ReactDOM from "react-dom";
import AuthService from "./services/AuthService";
import AuthProvider from "./auth/AuthProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authService={new AuthService()}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
