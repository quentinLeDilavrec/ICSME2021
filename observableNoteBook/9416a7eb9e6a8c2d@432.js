// https://observablehq.com/@mukhtyar/box-plot@432
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["local_climate_snapshot.csv",new URL("./files/eb4085a216bc0201ac3883b3aafc8c3ca1b6ad76f63b78550210682acd5f3e0b5f4aed574b55aab179878088e3258b216f2e0c1f4df1507cfa42dbd3a9ead571",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Box Plot

A box-and-whisker plot shows summary statistics of a quantitative distribution. Here, annual avg maximum temperature (*y*-axis) for a location is plotted for historical and future climate scenarios (*x*-axis).`
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","data","x","y","xAxis","yAxis"], function(d3,DOM,width,height,data,x,y,xAxis,yAxis)
{
  const svg = d3.select(DOM.svg(width, height));
  
  const boxWidth = 50;
  const jitterWidth = 50;
  
  const groups = svg.selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.key)}, 0)`)
      .attr("class", d => d.key);
  
  groups
    .selectAll("vertLine")
    .data(d => [d.value.range])
    .join("line")
          .attr("class", "vertLine")
          .attr("stroke", "#C0C0C0")
          .attr('stroke-width','1px')
          .style("width", 40)
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", range => y(range[0]))
          .attr("y2", range => y(range[1]));
  
  groups
    .selectAll("points")
    .data(d => d.value)
    .join("circle")
      .attr("cx", d => 0 - jitterWidth/2 + Math.random() * jitterWidth)
      .attr("cy", d => y(d.value))
      .attr("r", 2)
      .style("fill", "#af5f68")
      .attr("fill-opacity", 0.8);
  
   groups
    .selectAll("box")
    .data(d => [d])
    .join("rect")
        .attr("class", "box")
        .attr("x", -boxWidth/2)
        .attr("y", d => y(d.value.quartiles[2]))
        .attr("height", d => y(d.value.quartiles[0])-y(d.value.quartiles[2]))
        .attr("width", boxWidth)
        .attr("stroke", "#808080")
        .style("fill", "rgb(255, 255, 255)")
        .style("fill-opacity", 0.7);
    
   groups
    .selectAll("horizontalLine")
    .data(d => [d.value.range[0], d.value.quartiles[1], d.value.range[1]])
    .join("line")
       .attr("class", "horizontalLine")
       .attr("stroke", "#808080")
       .attr('stroke-width','1px')
       .style("width", 40)
       .attr("x1", -boxWidth/2)
       .attr("x2", +boxWidth/2)
       .attr("y1", d => y(d))
       .attr("y2", d => y(d));
  

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
  main.variable(observer("flatData")).define("flatData", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("local_climate_snapshot.csv").text(), ({series,period,stat,date,value}) => ({name: `${series} ${period}`, date, value: +value}))
)});
  main.variable(observer("data")).define("data", ["d3","flatData"], function(d3,flatData){return(
d3.nest()
  .key(function(d){ return d.name;})
  .rollup(function (series) {
      const bin = series.map(d => d);
      const values = series.map(d => d.value);
      values.sort((a, b) => a - b);
      const min = values[0];
      const max = values[values.length - 1];
      const q1 = d3.quantile(values, 0.25);
      const q2 = d3.quantile(values, 0.50);
      const q3 = d3.quantile(values, 0.75);
      const iqr = q3 - q1; // interquartile range
      const r0 = Math.max(min, q1 - iqr * 1.5);
      const r1 = Math.min(max, q3 + iqr * 1.5);
      bin.quartiles = [q1, q2, q3];
      bin.range = [r0, r1];
      bin.outliers = bin.filter(v => v.value < r0 || v.value > r1); // TODO
      return bin;
  })
  .entries(flatData)
)});
  main.variable(observer("x")).define("x", ["d3","margin","width","data"], function(d3,margin,width,data){return(
d3.scaleBand()
    .range([margin.left, width - margin.right])
    .domain(data.map(d => d.key))
    .paddingInner(1)
    .paddingOuter(.5)
)});
  main.variable(observer("y")).define("y", ["d3","flatData","height","margin"], function(d3,flatData,height,margin){return(
d3.scaleLinear()
    .domain([d3.min(flatData, d => d.value), d3.max(flatData, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 30, left: 40}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
