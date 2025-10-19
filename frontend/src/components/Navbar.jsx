import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthProvider.jsx';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate('/');
  };

  return (
    <nav className="bg-white h-20 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full px-6">
        
        {/* UPDATED: Brand text now uses the primary theme color */}
        <Link to="/" className="text-3xl font-bold text-purple-700">EventEase</Link>

        <div className="flex items-center space-x-8 text-lg font-medium text-slate-700">
          
          {/* UPDATED: Underline hover effect now uses the theme's purple color */}
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-600 to-purple-600 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
          >
            Home
          </Link>
          
          {!user && (
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-purple-600 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Signup
            </Link>
          )}

          {!user && (
            <Link 
              to="/signin"
              className="bg-gradient-to-r from-purple-600 to-purple-600 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Signin
            </Link>
          )}

          {user?.roles?.includes("organizer") && (
            <Link 
              to="/dashboard"
              className="bg-gradient-to-r from-purple-600 to-purple-600 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              Dashboard
            </Link>
          )}

          {user?.roles?.includes("participant") && (
            <Link 
              to="/my-registrations"
              className="bg-gradient-to-r from-purple-600 to-purple-600 bg-no-repeat bg-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300 ease-out"
            >
              My Registrations
            </Link>
          )}

          {user && (
            // UPDATED: Logout button now uses the primary theme gradient
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;