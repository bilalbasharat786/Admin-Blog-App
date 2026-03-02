import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {post.image ? (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            No Image Provided
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider">
            <FiCalendar /> {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
            {post.content}
          </p>
        </div>
        <Link 
          to={`/post/${post._id}`} 
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 self-start transition"
        >
          Read Article <FiArrowRight className="transform group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;