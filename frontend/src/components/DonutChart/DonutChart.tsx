interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  gradientId: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  size = 80,
  strokeWidth = 10,
  gradientId,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="text-gray-800">
      <defs>
        <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={`url(#${gradientId})`}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        dy="0.3em"
        textAnchor="middle"
        className="fill-gray-800 text-sm font-semibold"
      >
        {percentage}%
      </text>
    </svg>
  );
};
