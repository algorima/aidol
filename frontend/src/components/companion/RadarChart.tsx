import { useTranslation } from "react-i18next";

import type { CompanionStats } from "@/schemas/companion";

interface RadarChartProps {
  stats: CompanionStats;
}

const STAT_KEYS: (keyof CompanionStats)[] = [
  "vocal",
  "dance",
  "rap",
  "visual",
  "stamina",
  "charm",
];

export function RadarChart({ stats }: RadarChartProps) {
  const { t } = useTranslation();

  const size = 260;
  const center = size / 2;
  const maxRadius = 70;
  const labelRadius = 100;

  // flat-top hexagon: 위에 점 2개 (30도 회전)
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 3;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = (Math.PI * 2 * index) / 6 - Math.PI / 3;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  };

  const points = STAT_KEYS.map((key, i) => getPoint(i, stats[key]));
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLevels.map((level) => {
          const gridPoints = STAT_KEYS.map((_, i) => getPoint(i, level));
          const gridPolygon = gridPoints.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <polygon
              key={level}
              points={gridPolygon}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-base-300"
            />
          );
        })}

        {STAT_KEYS.map((_, i) => {
          const endPoint = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-base-300"
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="2"
          className="text-secondary"
        />

        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="currentColor"
            className="text-secondary"
          />
        ))}

        {STAT_KEYS.map((key, i) => {
          const pos = getLabelPosition(i);
          return (
            <g key={key}>
              <text
                x={pos.x}
                y={pos.y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-label-l fill-base-content font-medium"
              >
                {t(`aidol:casting.abilities.${key}`)}
              </text>
              <text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-label-l fill-secondary font-medium"
              >
                {stats[key]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
