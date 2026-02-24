import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import CreateEditPost from "./pages/CreateEditPost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/create" 
                element={
                  <ProtectedRoute>
                    <CreateEditPost />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/edit/:id" 
                element={
                  <ProtectedRoute>
                    <CreateEditPost />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <footer className="bg-gray-900 text-gray-400 py-6 text-center">
            <p>&copy; {new Date().getFullYear()} MyBlog. Built with MERN Stack.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
