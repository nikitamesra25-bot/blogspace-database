import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData);

      setMessage(data.message);

      setFormData({
        name: "",
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
        <h1>Create Account</h1>
        <p>Join BlogSpace today!</p>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

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
          minLength={6}
          style={styles.input}
        />

        {message && (
          <p style={{ color: "green" }}>{message}</p>
        )}

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Registering..." : "Register"}
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

export default Register;
