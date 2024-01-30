// src/scatterPlot.ts

import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

export const createScatterPlot = (container: SVGSVGElement, data: DataPoint[]): void => {
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select(container)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)!])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)!])
    .range([height, 0]);

  // Add x-axis label
  svg.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.top + 20})`)
    .style('text-anchor', 'middle')
    .text('X Axis');

  // Add y-axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Y Axis');

  // Create circles for each data point
  const circles = svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 5) // Adjust the radius as needed
    .attr('fill', 'skyblue')
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut);

  // Add axes
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .call(d3.axisLeft(yScale));

  // Add transition on data update
  const updateDataButton = document.getElementById('updateDataButton');
  if (updateDataButton) {
    updateDataButton.addEventListener('click', updateData);
  }

  function updateData(): void {
    const newData: DataPoint[] = [
      { x: Math.random() * 50, y: Math.random() * 30 },
      { x: Math.random() * 50, y: Math.random() * 30 },
      { x: Math.random() * 50, y: Math.random() * 30 },
      { x: Math.random() * 50, y: Math.random() * 30 },
      { x: Math.random() * 50, y: Math.random() * 30 },
    ];

    circles.data(newData)
      .transition()
      .duration(1000)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y));
  }

  // Tooltip
  const tooltip = d3.select(container)
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip');

  function handleMouseOver(event: any, d: DataPoint): void {
    tooltip.transition()
      .duration(200)
      .style('opacity', .9);
    tooltip.html(`(${d.x}, ${d.y})`)
      .style('left', (event.pageX + 5) + 'px')
      .style('top', (event.pageY - 28) + 'px');
  }

  function handleMouseOut(): void {
    tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  }
};
