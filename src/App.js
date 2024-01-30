"use strict";
// src/App.tsx
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var scatterPlot_1 = require("./scatterPlot");
var ScatterPlot = function () {
    var svgRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        // Sample data
        var data = [
            { x: 10, y: 20 },
            { x: 20, y: 25 },
            { x: 30, y: 10 },
            { x: 40, y: 15 },
            { x: 50, y: 30 },
        ];
        // Use the createScatterPlot function
        if (svgRef.current) {
            (0, scatterPlot_1.createScatterPlot)(svgRef.current, data);
        }
    }, []);
    return (<svg ref={svgRef}></svg>);
};
var App = function () {
    return (<div className="App">
      <header className="App-header">
        <h1>D3 Scatter Plot Chart in React with TypeScript</h1>
      </header>
      <main>
        <ScatterPlot />
      </main>
    </div>);
};
exports.default = App;
