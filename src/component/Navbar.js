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
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Recipes
              </NavLink>
              <NavLink
                to="/cuisines"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
              >
                Cuisines
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
              <>
                <button
                  onClick={openModal}
                  className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Recipe
                </button>

                <NavLink
                  onClick={handleLogOut}
                  to="/"
                  className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:underline hover:font-bold active:underline active:font-bold"
                >
                  Log out
                </NavLink>
              </>
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
