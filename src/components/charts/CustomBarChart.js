import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine,
} from "recharts";

function CustomBarChart(props) {
  const {
    margin = {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
    data = [], style, XAxisLabel = "", YAxisLabel = "", dataKey = "",
    barColor = "hsl(330, 49%, 55%)", refLineColor = "hsl(0, 0%, 0%)",
    width = 390, height = 300, barSize = 25, y = 0,
  } = props;
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={margin}
      style={style}
    >
      <XAxis dataKey={XAxisLabel} />
      <YAxis dataKey={YAxisLabel} />
      <Tooltip />
      <ReferenceLine y={y} stroke={refLineColor} />
      <Bar
        dataKey={dataKey}
        fill={barColor}
        barSize={barSize}
      />
    </BarChart>
  );
}

export default CustomBarChart;
