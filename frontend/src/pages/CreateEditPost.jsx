import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const CreateEditPost = () => {
  const { id } = useParams(); // Agar URL mein ID hai toh matlab EDIT mode hai
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      // Edit mode: Pehle se post ka data le aao
      const fetchPost = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image || "");
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const postData = { title, content, image };

    try {
      if (id) {
        // Update karna hai
        await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${id}`, postData, config);
      } else {
        // Create karna hai
        await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, postData, config);
      }
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{id ? "Edit Post" : "Create New Post"}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Post Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Image URL (Optional)</label>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => navigate("/admin/dashboard")} className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
            {id ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;