import { ArrowUpRight, ArrowDownLeft, Clock, Coins } from "lucide-react"

const TransactionHistoryCard = ({ transactions = [] }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Transaction History</h3>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-2xl mb-4">
            <Coins className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 text-lg font-medium mb-2">No transactions yet</p>
          <p className="text-gray-500 text-sm">Start playing games to earn coins!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="group relative bg-slate-800/30 hover:bg-slate-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-xl p-4 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-xl ${
                      tx.type === "deposit"
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-red-500/20 border border-red-500/30"
                    }`}
                  >
                    {tx.type === "deposit" ? (
                      <ArrowDownLeft className="w-5 h-5 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </p>
                    <p className="text-gray-400 text-sm">{tx.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(tx.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold flex items-center gap-1 ${
                      tx.type === "deposit" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <span>{tx.type === "deposit" ? "+" : "-"}</span>
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span>{tx.amount}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{tx.type === "deposit" ? "Earned" : "Spent"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TransactionHistoryCard
