import React from 'react';
import { Users, Award, TrendingUp, Zap } from 'lucide-react'; // lucide-react से आइकन आयात करें

// Main App Component renamed to StatisticsDashboard
const StatisticsDashboard = () => {
  // Data for each card
  const stats = [
    {
      id: 1,
      icon: <Users className="w-8 h-8 text-purple-600" />, // lucide-react Users आइकन
      title: 'Active Users',
      value: '12.5K +',
      bgColor: 'bg-purple-100',
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8 text-blue-600" />, // lucide-react Award आइकन
      title: 'Total Rewards',
      value: '🪙1.2M+',
      bgColor: 'bg-blue-100',
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-green-600" />, // lucide-react TrendingUp आइकन
      title: 'Success Rate',
      value: '98.5%',
      bgColor: 'bg-green-100',
    },
    {
      id: 4,
      icon: <Zap className="w-8 h-8 text-yellow-600" />, // lucide-react Zap आइकन
      title: 'Daily Codes',
      value: '100+',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center p-7 rounded-2xl shadow-xl bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 border border-purple-200 transition-all duration-300 hover:scale-[1.06] hover:shadow-2xl hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 cursor-pointer"
          >
            {/* Icon container */}
            <div
              className="p-4 rounded-full mb-4 bg-gradient-to-br from-white via-purple-50 to-blue-100 shadow"
            >
              {stat.icon}
            </div>
            {/* Title */}
            <h3 className="text-purple-700 text-lg font-semibold mb-1 drop-shadow">
              {stat.title}
            </h3>
            {/* Value */}
            <p className="text-gray-900 text-3xl font-extrabold tracking-wide">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsDashboard;
