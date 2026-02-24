import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        </div>
        <Link to={`/post/${post._id}`} className="text-blue-600 font-semibold hover:text-blue-800 self-start">
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PostCard;