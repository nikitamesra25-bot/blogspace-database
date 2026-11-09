import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data.blogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <h2>Loading blogs...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Welcome to BlogSpace</h1>

      <p>Explore stories, ideas and experiences.</p>

      <h2>Latest Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs available yet.</p>
      ) : (
        <div style={styles.grid}>
          {blogs.map((blog) => (
            <div key={blog._id} style={styles.card}>
              <h3>{blog.title}</h3>

              <p>{blog.description}</p>

              <p>
                Author: {blog.author?.name || "Unknown"}
              </p>

              <Link to={`/blog/${blog._id}`}>
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
  },
};

export default Blogs;