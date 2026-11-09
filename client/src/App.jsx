import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import Dashboard from "./pages/Dashboard";
import EditBlog from "./pages/EditBlog";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
  const updateLoginStatus = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  window.addEventListener("authChange", updateLoginStatus);

  return () => {
    window.removeEventListener("authChange", updateLoginStatus);
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        BlogSpace
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.navLink}>Home</Link>

        {!isLoggedIn && (
          <>
            <Link to="/register" style={styles.navLink}>Register</Link>
            <Link to="/login" style={styles.navLink}>Login</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            {/* <Link to="/create-blog" style={styles.navLink}>
              Create Blog
            </Link> */}
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#172554",
  },
  logo: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    padding: "8px 15px",
    background: "white",
    color: "#172554",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
