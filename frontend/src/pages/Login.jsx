import { useState } from "react";
import { login, register } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleLogin = async () => {
    setError("");
    const err = validate();
    if (err) return setError(err);

    try {
      setLoading(true);
      await login(email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    const err = validate();
    if (err) return setError(err);

    try {
      setLoading(true);
      await register(email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="title">Note Tracker</div>
      <div className="subtitle">
  Create an account or login — registration signs you in automatically
</div>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />

      <div style={{ height: 12 }} />

      <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password (min 6 chars)"
    value={password}
    onChange={e => setPassword(e.target.value)}
    disabled={loading}
    style={{ paddingRight: 44 }}
  />

  <button
    type="button"
    onClick={() => setShowPassword(v => !v)}
    style={{
      position: "absolute",
      right: 8,
      top: 8,
      height: 28,
      width: 28,
      borderRadius: "50%",
      border: "none",
      background: "rgba(255,255,255,0.2)",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>

      {error && (
        <div style={{ color: "#ff6b6b", marginTop: 12 }}>
          {error}
        </div>
      )}

      <div className="actions">
        <button
          className="primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Please wait…" : "Login"}
        </button>

        <button
          className="secondary"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Please wait…" : "Register"}
        </button>
      </div>
    </div>
  );
}



