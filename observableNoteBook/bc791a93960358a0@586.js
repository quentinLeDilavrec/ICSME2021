// https://observablehq.com/@quentinledilavrec/snapping-histogram-slider@586
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Snapping Histogram Slider`
)});
  main.variable(observer("viewof myslider")).define("viewof myslider", ["histogramSliderRaw","develop"], function(histogramSliderRaw,develop){return(
histogramSliderRaw(develop({
  1: 12,
  2: 18,
  8: 14,
  9: 2,
  12: 22,
  15: 8,
  22: 3,
}), {h: 100, defaultRange: [25, 75], bucketSize: 10})
)});
  main.variable(observer("myslider")).define("myslider", ["Generators", "viewof myslider"], (G, _) => G.input(_));
  main.variable(observer()).define(["myslider"], function(myslider){return(
myslider
)});
  main.variable(observer("develop")).define("develop", function(){return(
x=> Object.entries(x).reduce((acc,[k,v])=>(acc.push(...Array(v).fill(parseInt(k))),acc),[])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Slider function`
)});
  main.variable(observer("histogramSlider")).define("histogramSlider", ["html","input","histogramSliderRaw"], function(html,input,histogramSliderRaw){return(
function histogramSlider(config = {}) {const {
    value = [], title, description, width = 400
  } = Array.isArray(config) ? {value: config} : config;
  const formEl = html`<form style="margin-left:30px"></form>`;

  const form = input({
    type: "custom",
    title,
    description,
    display: v =>
      histogramSliderRaw(value,{
    'margin': {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },...config}),
    getValue: () => [],
    form: formEl
  });
  return form;
}
)});
  main.variable(observer("fixedArea")).define("fixedArea", ["d3"], function(d3){return(
function fixedArea(bucketsCount) { return  data => {
    const sorted = data.sort(d3.ascending);
    const bins = []
    const perBin = Math.floor(data.length / bucketsCount)
    for(let i = 0; i< data.length;) {
      const curr = data[i]
      if(bins[bins.length-1]!==curr) {
        bins.push(curr)
        i = i + perBin
      } else {
        i++;
      }
    }
    return bins
  }
}
)});
  main.variable(observer("randInput")).define("randInput", ["d3"], function(d3){return(
d3.range(99).map(d3.randomNormal())
)});
  main.variable(observer()).define(["d3","randInput","fixedArea"], function(d3,randInput,fixedArea)
{
return [d3.max(randInput),fixedArea(10)(randInput)]
}
);
  main.variable(observer("histogramSliderRaw")).define("histogramSliderRaw", ["d3","fixedArea","DOM","style"], function(d3,fixedArea,DOM,style){return(
function histogramSliderRaw(histogram, customOptions) {
  
  const defaultOptions = {
    'w': 400,
    'h': 150,
    margin: {
      top: 20,
      bottom: 20,
      left: 30,
      right: 30,
    },
    scaleY: d3.scaleLinear(),
    lowerY: 0,
    bucketsCount: 20,
    defaultRange: [0, 100],
    format: d3.format('.3s'),
  };

  // set width and height of svg
  const { w, h, margin, defaultRange, format, scaleY, lowerY, bucketsCount } = {...defaultOptions, ...customOptions};

  
  const [ min, max ] = d3.extent(histogram);
  const range = [min, max + 1]
  
  console.log(histogram)
  console.log(fixedArea(bucketsCount)(histogram))
  
  const bins = d3.bin().thresholds(fixedArea(bucketsCount))(histogram)
  
  console.log(bins)
  // dimensions of slider bar
  const width = w - margin.left-40 - margin.right;
  const height = h - margin.top - margin.bottom;

  // create x scale
  const x = d3.scaleLinear()
    .domain(range)  // data space
    .range([0, width]);  // display space
  const y = scaleY
    .domain([lowerY, d3.max(Object.values(histogram))])
    .range([0, height])
    .nice();
  
  // create svg and translated g
  const svg = d3.select(DOM.svg(w,h))
  const g = svg.append('g').attr('transform', `translate(${margin.left+20}, ${margin.top})`)

  const bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("g")
  .attr("class", "bar")
  .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length/(d.x1 - d.x0)) + ")"; });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", function(d) { return x(d.x1) - x(d.x0); })
    .attr("height", function(d) { return height - (y(d.length/(d.x1 - d.x0))); });

  bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", function(d) { return (x(d.x1) - x(d.x0)) / 2; })
    .attr("text-anchor", "middle")
    .text(function(d) { return format(d.length); });
  
 // draw histogram values
   if(false) {
 g.append('g').selectAll('rect')
    .data(histogram)
    .enter()
    .append('rect')
    .attr('x', d => x(d))
    .attr('y', d => height - y(histogram[d] || 0))
    .attr('width', width / (range[1] - range[0]))
    .attr('height', d => y(histogram[d] || 0)) //d => y(histogram[d] || 0))
    .style('fill', '#555');

  // draw background lines
    g.append('g').selectAll('line')
      //.data(d3.range(range[0], range[1]))
      .data(d3.range(0, 30))
      .enter()
      .append('line')
      //.attr('x1', d => width/resolution*d)
      //.attr('x2', d => width/resolution*d)
      .attr('y1', 0)
      .attr('y2', height)
      .style('stroke', '#ccc');
  }
  // labels
  var labelMax = g.append('text')
    .attr('id', 'label-min')
    .attr('x', '-0.6em')
    .attr('y', height)
    .text(min);

  var labelMax = g.append('text')
    .attr('id', 'label-max')
    .attr('x', '-0.6em')
    .attr('y', 0)
    .text(max);
  
  var labelL = g.append('text')
    .attr('id', 'labelleft')
    .attr('x', 0)
    .attr('y', height + 5);

  var labelR = g.append('text')
    .attr('id', 'labelright')
    .attr('x', 0)
    .attr('y', height + 5);
 const bucketSize = 1
  // define brush
  var brush = d3.brushX()
    .extent([[0, 0], [width, height]])
    .on('brush', function() {
      var s = d3.event.selection;
      // update and move labels
      labelL.attr('x', s[0]).text(format(Math.round(x.invert(s[0])) * bucketSize));
      labelR.attr('x', s[1]).text(format((Math.round(x.invert(s[1]))) * bucketSize));
      // move brush handles      
      handle
        .attr("display", null)
        .attr("transform", (d, i) => "translate(" + [ s[i], - height / 4] + ")");
      // update view
      // if the view should only be updated after brushing is over, 
      // move these two lines into the on('end') part below
      svg.node().value = s.map(d => bucketSize * Math.round(x.invert(d)));
      svg.node().dispatchEvent(new CustomEvent("input"));
    })
    .on('end', function() {
      if (!d3.event.sourceEvent) return;
      var d0 = d3.event.selection.map(x.invert);
      var d1 = d0.map(Math.round)
      d3.select(this).transition().call(d3.event.target.move, d1.map(x))
    });
  
  

  // append brush to g
  var gBrush = g.append("g")
      .attr("class", "brush")
      .call(brush);

  // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
  var brushResizePath = function(d) {
      var e = +(d.type == "e"),
          x = e ? 1 : -1,
          y = height / 2;
      return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
        "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
        "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
  }

  var handle = gBrush.selectAll(".handle--custom")
    .data([{type: "w"}, {type: "e"}])
    .enter().append("path")
    .attr("class", "handle--custom")
    .attr("stroke", "#888")
    .attr("fill", '#eee')
    .attr("cursor", "ew-resize")
    .attr("d", brushResizePath);
    
  // override default behaviour - clicking outside of the selected area 
  // will select a small piece there rather than deselecting everything
  // https://bl.ocks.org/mbostock/6498000
  gBrush.selectAll(".overlay")
    .each(function(d) { d.type = "selection"; })
    .on("mousedown touchstart", brushcentered);
  
  function brushcentered() {
    var dx = x(1) - x(0), // Use a fixed width when recentering.
    cx = d3.mouse(this)[0],
    x0 = cx - dx / 2,
    x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }
  
  // select entire range
  //  gBrush.call(brush.move, range.map(x))
  
  // select default range
  gBrush.call(brush.move, defaultRange
        .map(d => width * (d / 100))
        .map(x.invert)
        .map(Math.round)
        .map(x));
  
  svg.append('style').text(style);
  return svg.node();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### CSS for the slider`
)});
  main.variable(observer("style")).define("style", function(){return(
`
<style>
svg {
	font-family: -apple-system, system-ui, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
}

rect.overlay {
	stroke: #888;
}

rect.selection {
	stroke: none;
  fill: steelblue;
  fill-opacity: 0.4;
}

#labelleft, #labelright, #label-max, #label-min  {
  font-size: 12px;
}

#labelleft, #labelright {
	dominant-baseline: hanging;
}

#label-min, #label-max {
	dominant-baseline: central;
	text-anchor: end;
}

#labelleft {
	text-anchor: end;
}

#labelright {
	text-anchor: start;
}
</style>
`
)});
  const child1 = runtime.module(define1);
  main.import("input", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5', "d3-array@>=2.1")
)});
  return main;
}
