// src/App.tsx

import React, { useEffect, useRef } from 'react';
import { createScatterPlot } from "./scatterPlot"

const ScatterPlot: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Sample data
    const data = [
      { x: 10, y: 20 },
      { x: 20, y: 25 },
      { x: 30, y: 10 },
      { x: 40, y: 15 },
      { x: 50, y: 30 },
    ];

    // Use the createScatterPlot function
    if (svgRef.current) {
      createScatterPlot(svgRef.current, data);
    }
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

const App: React.FC = () => {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl">D3 Scatter Plot Chart </h1>
      </header>
      <main className="container mx-auto mt-8 flex-grow">
           <ScatterPlot />
      </main>
    </div>
  );
};

export default App;
