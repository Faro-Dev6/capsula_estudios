import { useEffect, useState } from "react";

export default function useAuth({ addLog }) {
  const [userEmail, setUserEmail] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Restore session
  useEffect(() => {
    const savedUser = localStorage.getItem("capsulastudios_user");

    if (savedUser) {
      setUserEmail(savedUser);
      addLog?.(`Sesión restaurada: ${savedUser}`);
    }
  }, [addLog]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail.includes("@")) {
      setLoginError("Por favor ingrese un correo válido.");
      return;
    }

    if (loginPassword.length < 4) {
      setLoginError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setLoginError("");
    setLoginSuccess(true);

    localStorage.setItem("capsulastudios_user", loginEmail);
    setUserEmail(loginEmail);

    addLog?.(`Login exitoso: ${loginEmail}`);

    setTimeout(() => {
      setLoginSuccess(false);
      setLoginEmail("");
      setLoginPassword("");
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("capsulastudios_user");
    setUserEmail(null);

    addLog?.("Sesión cerrada");
  };

  return {
    userEmail,
    setUserEmail,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginError,
    loginSuccess,
    handleLoginSubmit,
    handleLogout,
  };
}