import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FiMenu, FiX, FiLogOut, FiLayout } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
            Blog<span className="text-gray-900">Verse</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
            {user?.role === "admin" ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300">
                  <FiLayout /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300 font-semibold"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <Link to="/admin-login" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition shadow-md">
                Admin Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 focus:outline-none text-2xl">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-lg absolute w-full left-0">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">Home</Link>
          {user?.role === "admin" ? (
            <>
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                <FiLayout /> Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-2">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
             <Link to="/admin-login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 mt-2">Admin Portal</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;