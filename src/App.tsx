// src/App.tsx

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

    // Set up the SVG container
    const width = 400;
    const height = 300;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([height, 0]);

    // Create circles for each data point
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5); // radius

    // Add axes
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>D3 Scatter Plot Chart in React with TypeScript</h1>
      </header>
      <main>
        <ScatterPlot />
      </main>
    </div>
  );
};

export default App;
