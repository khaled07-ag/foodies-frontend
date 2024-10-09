import React, { useState } from "react";
import ChefItem from "./chefItem";
const Chefs = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-row items-center justify-center h-1/2">
      <ChefItem setUsername={setUsername} />
    </div>
  );
};

export default Chefs;
