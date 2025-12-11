import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const INSTRUCTIONS = [
  "Uninstall Winzo if already installed",
  "Download Winzo using button below",
  "Login with unused phone number",
  "Play 3 games in Winzo (MANDATORY)",
];

const Task = () => {
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 31); // 9:31 in seconds
  const [isTaskInProgress, setIsTaskInProgress] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTaskInProgress(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <>
    <Helmet>
      <title>Task | Free Redeem Code Daily</title>
      <meta
        name="description"
        content="Complete tasks to earn rewards."
      />
      <meta name="keywords" content="tasks, rewards, earn" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://freeredeemcodedaily.com/task" />
      <meta property="og:title" content="Task | Free Redeem Code Daily" />
      <meta property="og:description" content="Complete tasks to earn rewards." />
      <meta property="og:url" content="https://freeredeemcodedaily.com/task" />
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-emerald-400 to-sky-400 rounded-3xl shadow-lg p-6 space-y-6 animate-fade-in mt-[140px]">
      <div className="text-center space-y-2">
        <h2 className="text-white text-3xl font-bold">🎯 Complete These Tasks</h2>
        <p className="text-white/80 text-sm">Follow the instructions carefully to complete the task.</p>
      </div>

      <ol className="list-decimal pl-6 space-y-3 text-white text-base">
        {INSTRUCTIONS.map((inst, idx) => (
          <li key={idx}>
            <span className={idx === 3 ? "text-yellow-300 font-semibold" : ""}>
              {inst}
            </span>
          </li>
        ))}
      </ol>

      <button
        className="w-full bg-white text-indigo-600 font-semibold text-lg py-3 rounded-xl shadow-md hover:bg-gray-100 transition duration-200 active:scale-95"
        onClick={() => window.open("https://winzo.page.link/download", "_blank")}
      >
        🚀 Download Winzo
      </button>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-5 flex flex-col items-center space-y-2">
        <p className="text-white text-base font-medium">⏳ Time Remaining</p>
        <p className="text-4xl font-bold tracking-tight text-white">
          {minutes}:{seconds}
        </p>
        {isTaskInProgress && (
          <p className="text-white/90 flex items-center gap-2 text-sm">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            Task in Progress...
          </p>
        )}
        {!isTaskInProgress && (
          <p className="text-green-300 text-sm font-semibold">✅ Task Time Completed</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Task;
