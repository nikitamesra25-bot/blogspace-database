import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBlogs } from "../services/api";
import { deleteBlog } from "../services/api";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const data = await getMyBlogs();
        setBlogs(data.blogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {
    await deleteBlog(id);

    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog._id !== id)
    );

    alert("Blog deleted successfully!");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>My Dashboard</h1>
        <p>Manage your blogs in one place.</p>

        <Link to="/create-blog" style={styles.createButton}>
          + Create New Blog
        </Link>
      </div>

      <h2>My Blogs ({blogs.length})</h2>

      {loading && <p>Loading your blogs...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && blogs.length === 0 && (
        <p>You have not created any blogs yet.</p>
      )}

      <div style={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog._id} style={styles.blogCard}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>

            <small>
              Published:{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </small>

            <br />

            <Link
              to={`/blog/${blog._id}`}
              style={styles.readMore}
            >
              Read More
            </Link>
            <Link
            to={`/edit-blog/${blog._id}`}
            style={styles.editButton}
            >
                Edit Blog
                </Link>
                <button
                onClick={() => handleDelete(blog._id)}
                style={styles.deleteButton}
                >
                    Delete Blog
                    </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "30px auto",
    padding: "20px",
  },
  header: {
    marginBottom: "30px",
  },
  createButton: {
    display: "inline-block",
    padding: "12px 20px",
    background: "#172554",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    marginTop: "10px",
  },
  blogList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  blogCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
  readMore: {
    display: "inline-block",
    marginTop: "15px",
    color: "#172554",
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },

  editButton: {
  display: "inline-block",
  marginTop: "15px",
  marginLeft: "15px",
  padding: "8px 15px",
  background: "#2563eb",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  fontWeight: "bold",
},

deleteButton: {
  display: "inline-block",
  marginTop: "15px",
  marginLeft: "15px",
  padding: "8px 15px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
},
};

export default Dashboard;
