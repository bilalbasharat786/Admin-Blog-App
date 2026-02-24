import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
    setPosts(data);
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, config);
        fetchPosts();
      } catch (error) {
        alert("Error deleting post");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link to="/admin/create" className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition">
          + Create New Post
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 rounded-tl-lg">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4 rounded-tr-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-800 font-medium">{post.title}</td>
                <td className="p-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="p-4 flex justify-center space-x-3">
                  <Link to={`/admin/edit/${post._id}`} className="text-green-600 hover:text-green-800 font-semibold">
                    Edit
                  </Link>
                  <button onClick={() => deletePost(post._id)} className="text-red-600 hover:text-red-800 font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <div className="text-center p-6 text-gray-500">No posts found.</div>}
      </div>
    </div>
  );
};

export default Dashboard;