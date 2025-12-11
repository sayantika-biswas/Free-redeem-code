import React from 'react';

const Transactions = () => {
  // dummy data
  const transactions = [
    { id: 1, label: 'Promo Code Applied', amount: '+🪙10', time: '2 days ago' },
    { id: 2, label: 'Withdrawal', amount: '-🪙10', time: '3 days ago' },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
      <div className="bg-white shadow rounded-lg divide-y">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{tx.label}</div>
              <div className="text-sm text-gray-500">{tx.time}</div>
            </div>
            <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
