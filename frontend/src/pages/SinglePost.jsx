import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiCalendar, FiUser, FiMessageSquare, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [visitorName, setVisitorName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${id}`);
        setPost(postData.data);
        const commentData = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${id}`);
        setComments(commentData.data);
      } catch (error) {
        toast.error("Error loading article.");
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!visitorName || !content) return toast.warning("Please fill all fields");
    setLoading(true);
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, {
        postId: id,
        visitorName,
        content
      });
      setComments([data, ...comments]); 
      setVisitorName("");
      setContent("");
      toast.success("Comment posted!");
      setLoading(false);
    } catch (error) {
      toast.error("Error posting comment");
      setLoading(false);
    }
  };

  if (!post) return <div className="text-center mt-32 text-xl font-semibold text-gray-500">Loading Article...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Article Header Image */}
      {post.image && (
        <div className="w-full h-[40vh] md:h-[60vh] bg-gray-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline mb-6">
            <FiArrowLeft /> Back to Articles
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium uppercase tracking-wider mb-10 pb-10 border-b border-gray-100">
            <div className="flex items-center gap-2"><FiCalendar className="text-blue-600 text-lg" /> {new Date(post.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><FiMessageSquare className="text-blue-600 text-lg" /> {comments.length} Comments</div>
          </div>
          
          <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FiMessageSquare /> Discussion ({comments.length})
          </h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Join the conversation</h4>
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none text-gray-400">
                <FiUser />
              </div>
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={visitorName} 
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <textarea 
              placeholder="What are your thoughts?" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-y transition mb-4"
              required
            ></textarea>
            <button type="submit" disabled={loading} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-md disabled:opacity-70">
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {comment.visitorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h5 className="font-bold text-gray-900 text-lg">{comment.visitorName}</h5>
                    <span className="text-xs text-gray-400 font-medium">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500 font-medium">Be the first to share your thoughts!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;