import React, { useState } from "react";
import "../styles/login.css";
import NavBar from "./homePage/NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.token);
        localStorage.setItem("refresh", data["refresh-token"]);
        console.log("Usuario:", data.user);
        window.location.href = "/main-menu";
      } else {
        setError(data.detail || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      setError("Ocurrió un error. Intenta de nuevo.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </>
  );
};

export default Login;
