import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FiArrowLeft, FiSave, FiImage, FiType, FiAlignLeft } from "react-icons/fi";
import { toast } from "react-toastify";

const CreateEditPost = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
          setTitle(data.title);
          setContent(data.content);
          setImage(data.image || "");
        } catch (error) {
          toast.error("Error loading post data");
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const postData = { title, content, image };

    try {
      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, postData, config);
        toast.success("Post updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, postData, config);
        toast.success("New post published!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-blue-600 transition">
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {id ? "Edit Article" : "Write a New Article"}
          </h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
            <FiType className="text-gray-400" /> Post Title
          </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium transition"
            placeholder="Enter a catchy title..."
            required 
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
            <FiImage className="text-gray-400" /> Featured Image URL (Optional)
          </label>
          <input 
            type="url" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="https://images.unsplash.com/photo-..."
          />
          {image && (
             <div className="mt-4 rounded-xl overflow-hidden h-40 w-full sm:w-1/2 relative border border-gray-200">
               <img src={image} alt="Preview" className="object-cover w-full h-full" />
             </div>
          )}
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
            <FiAlignLeft className="text-gray-400" /> Main Content
          </label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-80 resize-y transition text-gray-700 leading-relaxed"
            placeholder="Write your amazing article here..."
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <button type="button" onClick={() => navigate("/admin/dashboard")} className="px-6 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-70 shadow-md">
            <FiSave className="text-lg" /> {loading ? "Saving..." : (id ? "Update Post" : "Publish Post")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;
