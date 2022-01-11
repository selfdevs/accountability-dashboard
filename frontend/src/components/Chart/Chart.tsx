import React from 'react';
import {
  Chart as RumbleChart,
  Labels,
  Layer,
  Lines,
  Ticks,
} from 'rumble-charts';
import './styles.css';

type ChartProps = {
  entries: Array<any>;
};

const Chart = ({ entries }: ChartProps) => {
  const goalSeries = entries.reduce((acc, { goal }, i) => {
    if (!goal) return acc;
    return [...acc, [i, goal]];
  }, []);
  const doneSeries = entries.reduce((acc, { done }, i) => {
    if (!done) return acc;
    return [...acc, [i, done]];
  }, []);

  const series = [
    {
      data: goalSeries,
    },
    {
      data: doneSeries,
    },
  ];
  if (entries.length === 0) return null;

  return (
    <RumbleChart
      height={300}
      width={800}
      series={series}
      className="chart-container"
    >
      <Layer width="90%" height="80%" position="middle center">
        <Ticks
          axis="y"
          lineLength="100%"
          lineVisible
          lineStyle={{
            stroke: 'lightgray',
          }}
          labelStyle={{
            dominantBaseline: 'middle',
            fill: 'lightgray',
            textAnchor: 'end',
          }}
        />
        <Ticks
          axis="x"
          labelStyle={{
            dominantBaseline: 'text-before-edge',
            fill: 'lightgray',
            textAnchor: 'end',
          }}
        />
        <Lines />
        <Labels />
      </Layer>
    </RumbleChart>
  );
};

export default Chart;
