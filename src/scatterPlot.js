"use strict";
// src/scatterPlot.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScatterPlot = void 0;
var d3 = require("d3");
var createScatterPlot = function (container, data) {
    var margin = { top: 20, right: 20, bottom: 60, left: 60 };
    var width = 500 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    var svg = d3.select(container)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', "translate(".concat(margin.left, ",").concat(margin.top, ")"));
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.x; })])
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.y; })])
        .range([height, 0]);
    // Add x-axis label
    svg.append('text')
        .attr('transform', "translate(".concat(width / 2, ",").concat(height + margin.top + 20, ")"))
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
    var circles = svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', function (d) { return xScale(d.x); })
        .attr('cy', function (d) { return yScale(d.y); })
        .attr('r', 5) // Adjust the radius as needed
        .attr('fill', 'skyblue')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    // Add axes
    svg.append('g')
        .attr('transform', "translate(0, ".concat(height, ")"))
        .call(d3.axisBottom(xScale));
    svg.append('g')
        .call(d3.axisLeft(yScale));
    // Add transition on data update
    var updateDataButton = document.getElementById('updateDataButton');
    if (updateDataButton) {
        updateDataButton.addEventListener('click', updateData);
    }
    function updateData() {
        var newData = [
            { x: Math.random() * 50, y: Math.random() * 30 },
            { x: Math.random() * 50, y: Math.random() * 30 },
            { x: Math.random() * 50, y: Math.random() * 30 },
            { x: Math.random() * 50, y: Math.random() * 30 },
            { x: Math.random() * 50, y: Math.random() * 30 },
        ];
        circles.data(newData)
            .transition()
            .duration(1000)
            .attr('cx', function (d) { return xScale(d.x); })
            .attr('cy', function (d) { return yScale(d.y); });
    }
    // Tooltip
    var tooltip = d3.select(container)
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip');
    function handleMouseOver(event, d) {
        tooltip.transition()
            .duration(200)
            .style('opacity', .9);
        tooltip.html("(".concat(d.x, ", ").concat(d.y, ")"))
            .style('left', (event.pageX + 5) + 'px')
            .style('top', (event.pageY - 28) + 'px');
    }
    function handleMouseOut() {
        tooltip.transition()
            .duration(500)
            .style('opacity', 0);
    }
};
exports.createScatterPlot = createScatterPlot;
