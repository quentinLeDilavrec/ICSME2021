// https://observablehq.com/@d3/scatterplot-matrix@181
import define1 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["penguins.csv",new URL("./files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Scatterplot Matrix

The scatterplot matrix (SPLOM) shows pairwise correlations for multi-dimensional data; each cell is a scatterplot where *x* encodes the column’s dimension and *y* encodes the row’s dimension. This matrix shows Gorman’s data on penguins near Palmer Station in Antarctica. See also the [brushable version](/@d3/brushable-scatterplot-matrix).`
)});
  main.variable(observer()).define(["swatches","z"], function(swatches,z){return(
swatches({color: z})
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","padding","xAxis","yAxis","columns","size","data","x","y","z"], function(d3,DOM,width,padding,xAxis,yAxis,columns,size,data,x,y,z)
{
  const svg = d3.select(DOM.svg(width, width))
      .attr("viewBox", `${-padding} 0 ${width} ${width}`)
      .style("max-width", "100%")
      .style("height", "auto");

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const cell = svg.append("g")
    .selectAll("g")
    .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
    .join("g")
      .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

  cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("x", padding / 2 + 0.5)
      .attr("y", padding / 2 + 0.5)
      .attr("width", size - padding)
      .attr("height", size - padding);

  cell.each(function([i, j]) {
    d3.select(this).selectAll("circle")
      .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
      .join("circle")
        .attr("cx", d => x[i](d[columns[i]]))
        .attr("cy", d => y[j](d[columns[j]]));
  });

  const circle = cell.selectAll("circle")
      .attr("r", 3.5)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => z(d.species));

  svg.append("g")
      .style("font", "bold 10px sans-serif")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(d => d);

  return svg.node();
}
);
  main.variable(observer("x")).define("x", ["columns","d3","data","padding","size"], function(columns,d3,data,padding,size){return(
columns.map(c => d3.scaleLinear()
    .domain(d3.extent(data, d => d[c]))
    .rangeRound([padding / 2, size - padding / 2]))
)});
  main.variable(observer("y")).define("y", ["x","size","padding"], function(x,size,padding){return(
x.map(x => x.copy().range([size - padding / 2, padding / 2]))
)});
  main.variable(observer("z")).define("z", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
    .domain(data.map(d => d.species))
    .range(d3.schemeCategory10)
)});
  main.variable(observer("xAxis")).define("xAxis", ["d3","size","columns","x"], function(d3,size,columns,x)
{
  const axis = d3.axisBottom()
      .ticks(6)
      .tickSize(size * columns.length);
  return g => g.selectAll("g").data(x).join("g")
      .attr("transform", (d, i) => `translate(${i * size},0)`)
      .each(function(d) { return d3.select(this).call(axis.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
}
);
  main.variable(observer("yAxis")).define("yAxis", ["d3","size","columns","y"], function(d3,size,columns,y)
{
  const axis = d3.axisLeft()
      .ticks(6)
      .tickSize(-size * columns.length);
  return g => g.selectAll("g").data(y).join("g")
      .attr("transform", (d, i) => `translate(0,${i * size})`)
      .each(function(d) { return d3.select(this).call(axis.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("penguins.csv").text(), d3.autoType)
)});
  main.variable(observer("columns")).define("columns", ["data"], function(data){return(
data.columns.filter(d => typeof data[0][d] === "number")
)});
  main.variable(observer("width")).define("width", function(){return(
954
)});
  main.variable(observer("size")).define("size", ["width","columns","padding"], function(width,columns,padding){return(
(width - (columns.length + 1) * padding) / columns.length + padding
)});
  main.variable(observer("padding")).define("padding", function(){return(
20
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  return main;
}
