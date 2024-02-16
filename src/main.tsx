import React from "react";
import ReactDOM from "react-dom";
import AuthService from "./services/AuthService";
import AuthProvider from "./auth/AuthProvider";
import App from "./App";
import GlobalStyle from "./GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authService={new AuthService()}>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
