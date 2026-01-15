import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../firebase/auth";
import logotipo from "../assets/logotipo-id.png";
import "../styles/_login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validating, setvalidating] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setvalidating(true);
      setError("");
      await loginAdmin(email, password);
      navigate("/admin");
      setvalidating(false);
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login fondo-radial-center">
      <img src={logotipo} alt="Mariana Isable" className="login__brand" />
      <form onSubmit={submit} className="login-form">
        <h2 className="login-form__title">Panel Administrador</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={validating}
          className="login-form__input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={validating}
          className="login-form__input"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-form__btn" disabled={validating}>
          {validating ? "Validando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
