import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FiEdit, FiTrash2, FiPlus, FiFileText, FiClock } from "react-icons/fi";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      setPosts(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch posts");
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, config);
        toast.success("Post deleted successfully!");
        fetchPosts(); 
      } catch (error) {
        toast.error("Error deleting post");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 md:min-h-full shrink-0">
        <h2 className="text-xl font-bold mb-8 text-gray-200 uppercase tracking-wider text-center md:text-left">Admin Panel</h2>
        <nav className="space-y-4 flex flex-row md:flex-col justify-center md:justify-start gap-4 md:gap-0">
          <Link to="/admin/dashboard" className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition duration-200 w-full justify-center md:justify-start">
            <FiFileText className="text-xl" /> <span className="hidden md:inline">Manage Posts</span>
          </Link>
          <Link to="/admin/create" className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg font-medium transition duration-200 w-full justify-center md:justify-start">
            <FiPlus className="text-xl" /> <span className="hidden md:inline">Create New</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Manage your blog content effectively.</p>
          </div>
          <Link to="/admin/create" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition duration-300 w-full sm:w-auto justify-center">
            <FiPlus /> Create Post
          </Link>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500 font-medium">Loading Data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-100">
                    <th className="p-5 font-semibold">Post Title</th>
                    <th className="p-5 font-semibold">Published Date</th>
                    <th className="p-5 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50/50 transition duration-150 group">
                      <td className="p-5">
                        <p className="text-gray-800 font-semibold text-base">{post.title}</p>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <FiClock /> {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center space-x-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-200">
                          <Link to={`/admin/edit/${post._id}`} className="bg-green-50 text-green-600 p-2 rounded-md hover:bg-green-100 hover:shadow-sm" title="Edit">
                            <FiEdit size={18} />
                          </Link>
                          <button onClick={() => deletePost(post._id)} className="bg-red-50 text-red-600 p-2 rounded-md hover:bg-red-100 hover:shadow-sm" title="Delete">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-10 text-center text-gray-500">No posts found. Start creating!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;