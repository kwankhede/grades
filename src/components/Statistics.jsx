import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Statistics.css";

function Statistics({ data }) {
  const scores = data.map((row) => row[2]);

  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  const minScore = 0;

  const maxScore = 100;

  const binWidth = 10;

  const numBins = Math.ceil((maxScore - minScore) / binWidth);

  const [histData, setHistData] = useState(Array(numBins).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [];

      for (let i = 0; i < numBins; i++) {
        const binStart = minScore + i * binWidth;
        const binEnd = binStart + binWidth;
        const count = scores.filter((score) => score >= binStart && score < binEnd).length;
        newData.push({ bin: binStart, count: count });
      }

      setHistData(newData);
    }, 1000);

    return () => clearInterval(interval);
  }, [scores, numBins, minScore, binWidth]);

  return (
    <div className="chart-container">
      <h2>Basic Statistics</h2>
      <p>Average Score: {avgScore.toFixed(2)}</p>
      <p>Minimum Score: {minScore}</p>
      <p>Maximum Score: {maxScore}</p>
      <BarChart id = "plot" width={700} height={500} data={histData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" label={{ value: 'Score out of 100', position: 'bottom' }} />
        <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#2E86C1" />
      </BarChart>
       <br/> 
       <br/> 
       <br/> 

    </div>
  );
}

export default Statistics;
