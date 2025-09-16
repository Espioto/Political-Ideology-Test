import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Line, ZAxis } from 'recharts';
import type { ScoreHistory } from '../types';

interface PoliticalCompassChartProps {
  economic: number;
  social: number;
  history: ScoreHistory[];
}

export const PoliticalCompassChart: React.FC<PoliticalCompassChartProps> = ({ economic, social, history }) => {
  const finalPosition = [{ x: economic, y: social, z: 250 }];
  
  // FIX: Add z-axis data for size control, as the `size` prop on Scatter is not supported.
  const historyData = history.map(h => ({
      x: h.economicScore,
      y: h.socialScore,
      z: 80,
  }));
  
  // Combine start (0,0), history, and final position for the line
  const lineData = [
      { x: 0, y: 0 },
      ...historyData,
      { x: economic, y: social }
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        style={{ background: 'rgba(17, 24, 39, 0.5)', borderRadius: '1rem', border: '1px solid #4B5563' }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />

        <XAxis
          type="number"
          dataKey="x"
          name="Economic"
          domain={[-100, 100]}
          tickCount={5}
          stroke="#9CA3AF"
          tick={{ fill: '#D1D5DB' }}
        >
          <Label value="Left" offset={-25} position="insideBottomLeft" fill="#F87171" fontSize={14} />
          <Label value="Right" offset={-25} position="insideBottomRight" fill="#60A5FA" fontSize={14} />
        </XAxis>
        
        <YAxis
          type="number"
          dataKey="y"
          name="Social"
          domain={[-100, 100]}
          tickCount={5}
          stroke="#9CA3AF"
          tick={{ fill: '#D1D5DB' }}
        >
            <Label value="Libertarian" angle={-90} offset={-25} position="insideLeft" fill="#A78BFA" fontSize={14} />
            <Label value="Authoritarian" angle={-90} offset={25} position="insideRight" fill="#FBBF24" fontSize={14} />
        </YAxis>

        <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#E5E7EB' }}
            formatter={(value) => [`${(value as number).toFixed(2)}`, '']}
        />

        <ReferenceLine y={0} stroke="#9CA3AF" strokeWidth={1} />
        <ReferenceLine x={0} stroke="#9CA3AF" strokeWidth={1} />
        
        <Line 
            data={lineData} 
            dataKey="y"
            name="Path"
            stroke="#6b7280" 
            strokeDasharray="5 5"
            dot={false}
            isAnimationActive={true}
            animationDuration={1500}
            type="monotone"
        />

        {/* FIX: Removed unsupported `size` prop. Size is now controlled by ZAxis. */}
        <Scatter name="Path" data={historyData} fill="#9CA3AF" shape="circle">
        </Scatter>
        
        {/* FIX: Adjust ZAxis range to map z-values (e.g., 80 and 250) to their intended sizes directly. */}
        <ZAxis dataKey="z" range={[80, 250]} />
        <Scatter name="Your Position" data={finalPosition} fill="#06B6D4" shape="star" isAnimationActive={true} animationDuration={1000} animationBegin={500} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
