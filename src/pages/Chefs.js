import React, { useState } from "react";
import ChefItem from "./chefItem";
const Chefs = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ChefItem setUsername={setUsername} />
    </div>
  );
};

export default Chefs;
