import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { deleteToken } from "../api/storage";
import logo from "../media/logo.png";
import Modal from "./Modal";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recipes, setRecipes] = useState([
    { id: 1, name: "Pasta", ingredients: ["Pasta", "Sauce", "Cheese"] },
    { id: 2, name: "Salad", ingredients: ["Lettuce", "Tomatoes", "Cucumber"] },
    // Add more recipe objects as needed
  ]);

  const handleLogOut = () => {
    deleteToken();
    setUser(false);
  };

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, { ...newRecipe, id: recipes.length + 1 }]);
    closeModal();
  };

  return (
    <nav className="sticky top-0 left-0git  right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <div className="flex items-baseline space-x-4">
              <NavLink
                to="/"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Recipes
              </NavLink>
              <NavLink
                to="/cuisines"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Cuisines
              </NavLink>
              <NavLink
                to="/chefs"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Chefs
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <div className="flex-grow flex justify-center">
                  <button
                    onClick={openModal}
                    className="bg-gradient-to-r from-orange-800 to-orange-900 hover:from-orange-800 hover:to-orange-900 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    + Add Recipe
                  </button>
                </div>

                <NavLink
                  onClick={handleLogOut}
                  to="/"
                  className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Log out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium ml-4 hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        setShowModal={setIsModalOpen}
        show={isModalOpen}
        onClose={closeModal}
        onAddRecipe={addRecipe}
      />
    </nav>
  );
};

export default Navbar;
