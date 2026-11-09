import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getBlogById } from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <h2>Loading blog...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div style={styles.container}>
      <Link to="/">← Back to Blogs</Link>

      <h1>{blog.title}</h1>

      <p>{blog.description}</p>

      <p>
        Author: {blog.author?.name || "Unknown"}
      </p>

      <p>
        Published:{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <hr />

      <article style={styles.content}>
        {blog.content}
      </article>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "850px",
    margin: "40px auto",
    padding: "20px",
    lineHeight: "1.8",
  },

  content: {
    whiteSpace: "pre-wrap",
    fontSize: "18px",
  },
};

export default BlogDetails;