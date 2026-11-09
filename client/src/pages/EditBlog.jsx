import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);

        setFormData({
          title: data.blog.title,
          description: data.blog.description,
          content: data.blog.content,
        });
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, formData);
      navigate(`/blog/${id}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Edit Your Blog</h2>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Blog Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter blog description"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Blog Content</label>
          <textarea
            name="content"
            placeholder="Write your blog content..."
            value={formData.content}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <button type="submit" style={styles.button}>
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 15px",
    background: "#f1f5f9",
  },
  card: {
    width: "100%",
    maxWidth: "650px",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    color: "#172554",
    marginBottom: "25px",
    fontSize: "28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    minHeight: "180px",
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "15px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    padding: "13px",
    marginTop: "10px",
    background: "#172554",
    color: "white",
    border: "none",
    borderRadius: "7px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    color: "red",
    textAlign: "center",
  },
};

export default EditBlog;
