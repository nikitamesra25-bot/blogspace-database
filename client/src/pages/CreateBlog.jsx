import { useState } from "react";
import { createBlog } from "../services/api";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
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
      const data = await createBlog(formData);

      setMessage(data.message || "Blog created successfully!");

      setFormData({
        title: "",
        description: "",
        content: "",
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
        <h1>Create New Blog</h1>
        <p>Share your thoughts with the world!</p>

        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter short description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={formData.content}
          onChange={handleChange}
          required
          rows="8"
          style={styles.textarea}
        />

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
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
  textarea: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    boxSizing: "border-box",
    resize: "vertical",
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

export default CreateBlog;
