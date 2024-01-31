import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ValidationError from "../../components/validation-error/ValidationError";
import { isEmailValid } from "../../helpers/EmailHelper";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import LogoEagle from "../../assets/logo.png";

type LoginPageProps = {
  authService: AuthService;
};

const defaultTheme = createTheme();

export default function SignIn(props: LoginPageProps) {
  const [form, setForm] = useState({
    email: {
      hasChanged: false,
      value: "",
    },
    password: {
      hasChanged: false,
      value: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Handle form submission or validation if needed
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const login = () => {
    props.authService
      .login(form.email.value, form.password.value)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          const errorMessage =
            "Credencial inválida. Verifique seu e-mail e senha.";
          console.error(errorMessage);
          setErrorMessage(errorMessage);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            borderRadius: 8,
            boxShadow: 2,
            backgroundColor: "white",
          }}
        >
          <img
            src={LogoEagle}
            alt="Logo Eagle"
            style={{ width: "400px", height: "150px" }}
          />

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Seu E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email.value}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: {
                    hasChanged: true,
                    value: event.target.value,
                  },
                })
              }
              data-testid="email"
            />
            <ValidationError
              hasChanged={form.email.hasChanged}
              errorMessage="Email é obrigatório"
              testId="email-required"
              type="required"
              value={form.email.value}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Sua Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={form.password.value}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: {
                    hasChanged: true,
                    value: event.target.value,
                  },
                })
              }
              data-testid="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!isEmailValid(form.email.value) || !form.password.value}
              onClick={login}
              data-testid="login-button"
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
