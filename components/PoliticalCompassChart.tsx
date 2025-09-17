import React, { useState, useCallback } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Line, ZAxis, Cell } from 'recharts';
import type { ScoreHistory } from '../types';

interface PoliticalCompassChartProps {
  economic: number;
  social: number;
  history: ScoreHistory[];
}

interface QuadrantInfo {
  name: string;
  description: string;
  color: string;
  x: number;
  y: number;
}

const quadrants: QuadrantInfo[] = [
  { name: "Authoritarian Left", description: "Supports government intervention in both economic and social matters", color: "#F87171", x: -50, y: 50 },
  { name: "Authoritarian Right", description: "Supports free markets but government control over social issues", color: "#60A5FA", x: 50, y: 50 },
  { name: "Libertarian Left", description: "Supports economic intervention but social freedom", color: "#A78BFA", x: -50, y: -50 },
  { name: "Libertarian Right", description: "Supports both economic and social freedom", color: "#FBBF24", x: 50, y: -50 }
];

export const PoliticalCompassChart: React.FC<PoliticalCompassChartProps> = ({ economic, social, history }) => {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<QuadrantInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const finalPosition = [{ x: economic, y: social, z: 250 }];
  
  const historyData = history.map((h, index) => ({
      x: h.economicScore,
      y: h.socialScore,
      z: 80,
      step: index + 1
  }));
  
  const lineData = [
      { x: 0, y: 0 },
      ...historyData,
      { x: economic, y: social }
  ];

  const getQuadrantFromPosition = useCallback((x: number, y: number): QuadrantInfo => {
    if (x <= 0 && y > 0) return quadrants[0]; // Auth Left
    if (x > 0 && y > 0) return quadrants[1];  // Auth Right
    if (x <= 0 && y <= 0) return quadrants[2]; // Lib Left
    return quadrants[3]; // Lib Right
  }, []);

  const currentQuadrant = getQuadrantFromPosition(economic, social);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">
            {data.step ? `Step ${data.step}` : 'Final Position'}
          </p>
          <p className="text-cyan-400">
            Economic: <span className="font-mono">{data.x?.toFixed(1) || '0.0'}</span>
          </p>
          <p className="text-purple-400">
            Social: <span className="font-mono">{data.y?.toFixed(1) || '0.0'}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      {/* Interactive Quadrant Labels */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {quadrants.map((quadrant, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              hoveredQuadrant?.name === quadrant.name ? 'scale-110' : 'scale-100'
            }`}
            style={{
              left: `${50 + quadrant.x}%`,
              top: `${50 - quadrant.y}%`,
            }}
          >
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold text-center whitespace-nowrap ${
                hoveredQuadrant?.name === quadrant.name 
                  ? 'bg-opacity-100 shadow-lg' 
                  : 'bg-opacity-70'
              }`}
              style={{ backgroundColor: quadrant.color + '20', color: quadrant.color }}
            >
              {quadrant.name}
            </div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          style={{ background: 'rgba(17, 24, 39, 0.5)', borderRadius: '1rem', border: '1px solid #4B5563' }}
          onMouseMove={(e) => {
            if (e && e.activePayload && e.activePayload[0]) {
              const data = e.activePayload[0].payload;
              if (data.x !== undefined && data.y !== undefined) {
                setHoveredQuadrant(getQuadrantFromPosition(data.x, data.y));
              }
            }
          }}
          onMouseLeave={() => setHoveredQuadrant(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" opacity={0.3} />

          <XAxis
            type="number"
            dataKey="x"
            name="Economic"
            domain={[-100, 100]}
            tickCount={5}
            stroke="#9CA3AF"
            tick={{ fill: '#D1D5DB', fontSize: 12 }}
            axisLine={{ stroke: '#6B7280' }}
          >
            <Label value="Left" offset={-30} position="insideBottomLeft" fill="#F87171" fontSize={12} fontWeight="bold" />
            <Label value="Right" offset={-30} position="insideBottomRight" fill="#60A5FA" fontSize={12} fontWeight="bold" />
          </XAxis>
          
          <YAxis
            type="number"
            dataKey="y"
            name="Social"
            domain={[-100, 100]}
            tickCount={5}
            stroke="#9CA3AF"
            tick={{ fill: '#D1D5DB', fontSize: 12 }}
            axisLine={{ stroke: '#6B7280' }}
          >
            <Label value="Libertarian" angle={-90} offset={-30} position="insideLeft" fill="#A78BFA" fontSize={12} fontWeight="bold" />
            <Label value="Authoritarian" angle={-90} offset={30} position="insideRight" fill="#FBBF24" fontSize={12} fontWeight="bold" />
          </YAxis>

          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine y={0} stroke="#9CA3AF" strokeWidth={2} opacity={0.5} />
          <ReferenceLine x={0} stroke="#9CA3AF" strokeWidth={2} opacity={0.5} />
          
          <Line 
            data={lineData} 
            dataKey="y"
            name="Path"
            stroke="#06B6D4" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
            isAnimationActive={true}
            animationDuration={2000}
            type="monotone"
          />

          <Scatter name="Path" data={historyData} fill="#9CA3AF" shape="circle">
            {historyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#9CA3AF" />
            ))}
          </Scatter>
          
          <ZAxis dataKey="z" range={[60, 200]} />
          <Scatter 
            name="Your Position" 
            data={finalPosition} 
            fill="#06B6D4" 
            shape="star" 
            isAnimationActive={true} 
            animationDuration={1500} 
            animationBegin={1000}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Current Position Info */}
      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">Your Position</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: currentQuadrant.color }}
          />
          <span className="text-white font-semibold">{currentQuadrant.name}</span>
        </div>

        {showDetails && (
          <div className="space-y-2 text-sm text-gray-300">
            <p>{currentQuadrant.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <span className="text-cyan-400 font-medium">Economic: </span>
                <span className="font-mono">{economic.toFixed(1)}</span>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(economic)}%` }}
                  />
                </div>
              </div>
              <div>
                <span className="text-purple-400 font-medium">Social: </span>
                <span className="font-mono">{social.toFixed(1)}</span>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.abs(social)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
