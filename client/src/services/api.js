const API_URL = import.meta.env.VITE_API_URL;
export const getMyBlogs = () => request("/blogs/my-blogs");
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getAllBlogs = () => {
  return request("/blogs");
};

export const getBlogById = (id) => {
  return request(`/blogs/${id}`);
};

export const registerUser = (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const createBlog = (blogData) => {
  return request("/blogs", {
    method: "POST",
    body: JSON.stringify(blogData),
  });
};

export const updateBlog = (id, blogData) =>
  request(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(blogData),
  });

  export const deleteBlog = (id) =>
  request(`/blogs/${id}`, {
    method: "DELETE",
  });