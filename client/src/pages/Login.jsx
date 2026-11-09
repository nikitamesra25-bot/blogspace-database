import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChange"));
      setMessage("Login successful!");

      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Welcome Back</h1>
        <p>Login to your BlogSpace account</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  form: {
    width: "350px",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#172554",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Login;
