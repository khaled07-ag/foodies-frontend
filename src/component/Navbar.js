import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { deleteToken } from "../api/storage";
import logo from "../media/logo.png";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  const handleLogOut = () => {
    deleteToken();
    setUser(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <div className="flex items-baseline space-x-4">
              <NavLink
                to="/"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Recipes
              </NavLink>
              <NavLink
                to="/categories"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Categories
              </NavLink>
              <NavLink
                to="/chefs"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Chefs
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <NavLink
                onClick={handleLogOut}
                to="/"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Log out
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium ml-4 hover:underline hover:font-bold active:underline active:font-bold"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
