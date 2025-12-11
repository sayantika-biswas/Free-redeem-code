import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import SpinGame from "./SpinGame";


const SpinPage = () => {
  const [selectedBundle, setSelectedBundle] = useState(null);

  const handleSelectGame = (bundle) => {
    setSelectedBundle(bundle);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={handleSelectGame} />
      <div className="flex-1 bg-gray-50 overflow-auto">
        <SpinGame selectedBundle={selectedBundle} />
      </div>
    </div>
  );
};

export default SpinPage;
