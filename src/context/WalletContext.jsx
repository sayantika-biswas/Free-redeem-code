// // src/context/WalletContext.js
// import React, { createContext, useState, useContext } from 'react';

// const WalletContext = createContext();

// export function WalletProvider({ children }) {
//   const [walletBalance, setWalletBalance] = useState(0);

//   return (
//     <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
//       {children}
//     </WalletContext.Provider>
//   );
// }

// export function useWallet() {
//   return useContext(WalletContext);
// }

import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]); // latest on top
  };

  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance, transactions, addTransaction }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
