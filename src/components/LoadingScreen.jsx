import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" /> {/* green */}
            <stop offset="50%" stopColor="#3F51B5" /> {/* blue */}
            <stop offset="100%" stopColor="#9C27B0" /> {/* purple */}
          </linearGradient>
        </defs>

        {/* Background Ring */}
        <circle
          stroke="#000000ff"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Foreground Progress Ring */}
        <circle
          stroke="url(#loading-gradient)" // Use the gradient here
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="absolute bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text text-lg font-semibold text-center">
        Loading
        <div>{progress}%</div>
      </div>
    </div>
  );
}
