// // context/UserContext.js
// import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null); // null means no user

//   return (
//     <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

// UserContext.js
import React, { createContext, useState, useContext } from "react";

// Context बनाओ
const UserContext = createContext();

// Provider component बनाओ
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);  // user info store करेगा

  // logout करने का function
  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook ताकि context को easily use कर सको
export const useUser = () => useContext(UserContext);
