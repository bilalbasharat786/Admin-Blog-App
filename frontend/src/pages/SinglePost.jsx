import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(postData.data);
        const commentData = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${id}`);
        setComments(commentData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!visitorName || !content) return alert("Please fill all fields");
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, {
        postId: id,
        visitorName,
        content
      });
      setComments([data, ...comments]); // Naya comment uper show karein
      setVisitorName("");
      setContent("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  if (!post) return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {post.image && <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" />}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
      
      <div className="prose max-w-none text-gray-800 text-lg whitespace-pre-wrap mb-12">
        {post.content}
      </div>

      <hr className="my-10 border-gray-300" />

      {/* Comments Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h4 className="text-lg font-semibold mb-4">Leave a Reply</h4>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={visitorName} 
            onChange={(e) => setVisitorName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea 
            placeholder="Your Comment..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            required
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold">
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-bold text-gray-800">{comment.visitorName}</h5>
                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;