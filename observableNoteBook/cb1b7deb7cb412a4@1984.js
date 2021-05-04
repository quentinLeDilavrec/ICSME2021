import define1 from "./c8f3c13694a25451@280.js";
import define2 from "./8d5ef3030dfd3bad@261.js";
import define3 from "./9416a7eb9e6a8c2d@432.js";
import define4 from "./ab3e70b29c480e6d@76.js";
import define5 from "./f78dcbb52c7c0c54@309.js";
import define6 from "./b2bbebd2f186ed03@1080.js";
import define7 from "./e93997d5089d7165@2303.js";
import define8 from "./bc791a93960358a0@586.js";
import define9 from "./5e4cd7b64408576b@181.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["meta@7.svg",new URL("./files/47705de7aed1f06c50b0b58c7029dcb5887cf198565057d8df9e7872edf169ee754c790ebedba60e49dccce094100cef0e973cb5260018c5cf7dcefe7a3dead6",import.meta.url)],["projectsStats@1.csv",new URL("./files/49f52bdb1bb42fbb006bc0d82ba741b10c2830d36de8bed2acea9f3ea789705f9e00f51b5d2e8c701a45814ce9846b8b619a046520342190233c5aa73ae8493e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Distribution of my dataset`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Database shema`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`My data can be represented by the following shema. Most node types are self explanatory, but to be clearer on some of them \`\`Project\`\` materialize maven modules and \`\`Range\`\` materialize ranges of code.`
)});
  main.variable(observer()).define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("meta@7.svg").image()
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`Hierarchical relation: \`\`Range\`\` ${tex`\subset`} \`\`FileSnapshot\`\` ${tex`\subset`} \`\`Commit\`\` ${tex`\subset`} \`\`Repository\`\``
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Selecting projects `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Aggregating data on projects`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`\`\`Repository\`\`, \`\`Commit\`\` and \`\`Project\`\` are computed early, using mainly JGit, scc, Maven and Spoon. Jgit allow us to pull repositories. scc count count the number of LoC. And Spoon count the number of tests and methods but also parse the pom to find the maven dependencies. finnally wee also try to compile the app and tests. It should be noted that \`\`Project\`\` nodes represent maven artifacts meaning that it can be shared between multiple commits. Thus through the relation \`\`RELEASED_FROM\`\` we store the LoC the number of tests and methodes, if we can produce an ast of the app and tests, if we can compile the app and tests. Using these 3 types of node, we can already filter out some projects and repositories to later focus on representative code bases.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dimensions
We can look at the distribution of different attributes (best of multiple commits (grouped by repository, groupId, artifactId))
- **loC:** the number of lines of code
- **java loC:** the number of lines of code
- **tests:** the number of tests
- **executables:** the number of methods/lambda/constructors
- **classes:** the number of classes
- **app compile:**
- **tests compile:**
- **ast of app:**
- **ast of tests:**
- *maven dependencies:* TODO might be significant
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Projects distibutions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Parallel Coordinates
see https://observablehq.com/@d3/brushable-parallel-coordinates for details about the plot.

__Try to select some ranges__, it's interactive.
`
)});
  main.variable(observer()).define(["viewof parallelCoordsChart"], function($0){return(
$0
)});
  main.variable(observer("viewof keyz")).define("viewof keyz", ["html","continuousDom"], function(html,continuousDom)
{
  const form = html`<form>${Object.assign(html`<select name=select>${continuousDom.map(key => Object.assign(html`<option>`, {value: key, textContent: key}))}</select>`, {value: "weight (lb)"})} <i style="font-size:smaller;">color encoding</i>`;
  form.select.onchange = () => (form.value = form.select.value, form.dispatchEvent(new CustomEvent("input")));
  form.select.onchange();
  return form;
}
);
  main.variable(observer("keyz")).define("keyz", ["Generators", "viewof keyz"], (G, _) => G.input(_));
  const child1 = runtime.module(define1).derive([{name: "rawdata", alias: "data"},{name: "continuousDom", alias: "keys"},{name: "kk", alias: "keyz"}], main);
  main.import("viewof selection", "viewof parallelCoordsChart", child1);
  main.import("selection", "parallelCoordsChart", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Entries selected with brushable // coord chart`
)});
  main.variable(observer()).define(["parallelCoordsChart"], function(parallelCoordsChart){return(
parallelCoordsChart
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Another way of selecting data
to make your filtering permanent you need to fork the notebook or/and change the \`\`defaultCatValues\`\` and \`\`defaultContinuousRanges\`\`.
`
)});
  main.variable(observer("catDomains")).define("catDomains", function(){return(
["tests compile","app compile","ast of tests","ast of app"]
)});
  main.variable(observer("continuousDomains")).define("continuousDomains", function(){return(
["loC","java loC","tests","executables","classes"]
)});
  main.variable(observer("defaultCatValues")).define("defaultCatValues", function(){return(
{"tests compile":0,"app compile":0,"ast of tests":0,"ast of app":0}
)});
  main.variable(observer("defaultContinuousRanges")).define("defaultContinuousRanges", function(){return(
{"loC":[2000,1000000],"java loC":[2000,200000],"tests":[50,undefined],"executables":undefined,"classes":undefined}
)});
  main.variable(observer("viewof catValues")).define("viewof catValues", ["inputsGroup","catDomains","rawdata","d3","select","defaultCatValues","chunkify"], function(inputsGroup,catDomains,rawdata,d3,select,defaultCatValues,chunkify)
{
  const perLine = 1
  return inputsGroup(
[   
  catDomains.map(x=>{
      let value = Array.from(rawdata).map(d => d[x])
      let uniq = d3.group(value,d=>d)
      const r = select({
        title: x,
        options: ([...uniq])
        .map(x=> ({
          label:x[0]+" :  x "+x[1].length, 
          value:x[0]})),
        multiple: true,
        value: defaultCatValues[x]
      })
      r.input.style.fontSize = "17px";
      r.input.style.marginTop = "5px";
      r.style.marginLeft = "50px";
      return r
      })],

                            
[
  chunkify(catDomains,perLine)
]
 ,{rowStyle:"display:inline-block;min-width:220px;vertical-align: top;"}                        
)
}
);
  main.variable(observer("catValues")).define("catValues", ["Generators", "viewof catValues"], (G, _) => G.input(_));
  main.variable(observer("viewof contValues")).define("viewof contValues", ["inputsGroup","chunkify","continuousDomains","rawdata","d3","defaultContinuousRanges","rangeSlider"], function(inputsGroup,chunkify,continuousDomains,rawdata,d3,defaultContinuousRanges,rangeSlider)
{
  const perLine = 2
  return inputsGroup(
[
    ...chunkify(continuousDomains
               .map(x=> {
                    const values = Array.from(rawdata).map(d => d[x])
                    const min = d3.min(values)
                    const max = d3.max(values)
                    const def = defaultContinuousRanges[x] || [min, max]
                   return rangeSlider({
                      min: min,
                      max: max,
                      // Note that values must be specified as array of length 2.
                      value: [def.length>0? def[0] || min : min, def.length>1? def[1] || max : max],
                      // Custom slider CSS, replaces all styles.
                      // Overrides the range color. Support for range colors is up to the theme.
                      format: 'd',
                      title: x,
                     step:1
            //        histogramSlider({
              //.map(x=>flexibleHistogramSlider({
            //      title: x,
            //      value: Array.from(rawdata).map(d => d[x])
              })
        }), perLine)
],
                            
[
  ...chunkify(continuousDomains,perLine),
]
 ,{rowStyle:"display:inline-block;min-width:450px;vertical-align: top;"}                         
)
}
);
  main.variable(observer("contValues")).define("contValues", ["Generators", "viewof contValues"], (G, _) => G.input(_));
  main.variable(observer("additionalFilter")).define("additionalFilter", function(){return(
(x) => x["tests"]/x["executables"]>.1 && x["java loC"]/x["loC"]>.4
)});
  main.variable(observer("filteredData")).define("filteredData", ["rawdata","catDomains","catValues","continuousDomains","contValues","additionalFilter"], function(rawdata,catDomains,catValues,continuousDomains,contValues,additionalFilter){return(
rawdata.filter(x=>catDomains.every(k=>catValues[k].includes(""+x[k])) && continuousDomains.every(k=>contValues[k][0]<=x[k] && x[k]<contValues[k][1] ) && additionalFilter(x))
)});
  main.variable(observer("filteredRepo")).define("filteredRepo", ["filteredData"], function(filteredData){return(
new Set(filteredData.map(x=>x.repository))
)});
  main.variable(observer("viewof selectedDimension")).define("viewof selectedDimension", ["select","type_domain"], function(select,type_domain){return(
select({
      title: "which dimension do you whant to see in details?",
      options: type_domain,
      multiple: false,
      value: ["tests"]
    })
)});
  main.variable(observer("selectedDimension")).define("selectedDimension", ["Generators", "viewof selectedDimension"], (G, _) => G.input(_));
  main.variable(observer()).define(["histogram"], function(histogram){return(
histogram
)});
  const child2 = runtime.module(define2).derive([{name: "data3", alias: "data"},{name: "histo_height", alias: "height"}], main);
  main.import("chart", "histogram", child2);
  main.variable(observer()).define(["md"], function(md){return(
md`#### As a box plot`
)});
  main.variable(observer()).define(["boxplot"], function(boxplot){return(
boxplot
)});
  main.variable(observer("projectsCount")).define("projectsCount", ["data3"], function(data3){return(
data3.length
)});
  const child3 = runtime.module(define3).derive([{name: "boxplot_data", alias: "flatData"}], main);
  main.import("chart", "boxplot", child3);
  main.variable(observer("boxplot_data")).define("boxplot_data", ["bbb","selectedDimension"], function(bbb,selectedDimension){return(
Object.assign(bbb,{y:selectedDimension, x:"projects"})
)});
  main.variable(observer("bbb")).define("bbb", ["aaa"], function(aaa){return(
aaa.filter(a=>a.x!=="repository"&&a.x!=="groupId"&&a.x!=="artifactId"&&a.x!=="app compile"&&a.x!=="tests compile"&&a.x!=="ast of app"&&a.x!=="ast of tests").reduce((acc,a)=>[...acc,...a.y.map(y=>({name:a.x,value:y}))],[])
)});
  main.variable(observer("aaa")).define("aaa", ["rawdata","filteredData"], function(rawdata,filteredData){return(
Array.from(Object.keys(rawdata[0]), d => ({x:d,y:filteredData.map(x=>x[d])}))
)});
  main.variable(observer("continuousDom")).define("continuousDom", ["type_domain"], function(type_domain){return(
type_domain.slice(3,12)
)});
  main.variable(observer("data3")).define("data3", ["filteredData","selectedDimension"], function(filteredData,selectedDimension){return(
filteredData.map(d => d[selectedDimension])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Result`
)});
  main.variable(observer("serializedLimits")).define("serializedLimits", ["catValues","contValues","html","copy","additionalFilter"], function(catValues,contValues,html,copy,additionalFilter)
{
 const r = []; 
 for(let k of Object.keys(catValues).slice(1)){
   r.push(k+"="+catValues[k])
 } 
 for(let k of Object.keys(contValues).slice(3)){
   r.push(k+"="+contValues[k])
 } 
  return Object.assign(
    html`<button>Click me to copy text!`,
    {onclick: () => copy("["+additionalFilter + "]+"+r)}
  );
}
);
  main.variable(observer()).define(["html","copy","filteredRepo"], function(html,copy,filteredRepo)
{
  return Object.assign(
    html`<button>Click me to copy text!`,
    {onclick: () => copy(""+Array.from(filteredRepo).join(" |"))}
  );
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Unfiltered Data`
)});
  main.variable(observer("rawdata")).define("rawdata", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("projectsStats@1.csv").text(), d3.autoType)
)});
  main.variable(observer("type_domain")).define("type_domain", ["rawdata"], function(rawdata){return(
Object.keys(rawdata[0])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Helpers`
)});
  main.variable(observer("kk")).define("kk", ["keyz","continuousDom"], function(keyz,continuousDom){return(
keyz || continuousDom[continuousDom.length-1]
)});
  main.variable(observer("histo_height")).define("histo_height", function(){return(
200
)});
  main.variable(observer("chunkify")).define("chunkify", function(){return(
function chunkify(array, size) {
  const r = []
  for(let i = 0; i < array.length; i++) {
    if (i%size===0) {
      r.push([])
    }
    r[Math.floor(i/size)].push(array[i])
  }
  return r
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Additional resources`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Cypher to obtain data for then filtering
\`\`\`
MATCH p = (n:Project)-[r:RELEASED_FROM]->(c:Commit)
WHERE r.testsCompile>=0 and NOT c.repo ENDS WITH ".git"
WITH distinct c.repo as repo, n as n, apoc.coll.sortMulti(collect(distinct r),['codeAST','testsAST','codeCompile','testsCompile','tests','executables','javaLoC'],1)[0] as r
RETURN repo as repository, n.groupId as groupId, n.artifactId as artifactId,
r.loC as loC, r.javaLoC as \`java loC\`, 
r.tests as tests, r.executables as executables, r.classes as classes,
r.testsCompile as \`tests compile\`, r.codeCompile as \`app compile\`,
r.testsAST as \`ast of tests\`, r.codeAST as \`ast of app\`
ORDER BY \`ast of tests\`, \`ast of app\`, \`tests compile\`, \`app compile\`, tests/(executables+0.0001) DESC
\`\`\`
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Cypher to filter projects
\`\`\`
MATCH p = (n:Project)-[r:RELEASED_FROM]->()
WITH n, r
ORDER BY r.tests DESC
WITH distinct n, collect(r)[0] as r
WHERE r.executables/(r.tests+0.00001) <= 100 
AND 50 <= r.executables
AND r.testsCompile = 0 AND r.testsAST = 0
RETURN distinct n
\`\`\`
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Tool imports`
)});
  const child4 = runtime.module(define4);
  main.import("copy", child4);
  const child5 = runtime.module(define5);
  main.import("inputsGroup", child5);
  const child6 = runtime.module(define6);
  main.import("rangeSlider", child6);
  const child7 = runtime.module(define7);
  main.import("select", child7);
  main.import("checkbox", child7);
  main.import("slider", child7);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-array@2", "d3-color@1", "d3-scale-chromatic@^1.4.0")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Failures`
)});
  main.variable(observer("flexibleHistogramSlider")).define("flexibleHistogramSlider", ["d3","histogramSlider"], function(d3,histogramSlider){return(
function flexibleHistogramSlider(config) {
  const bining = d3.bin()
  if(config.binCount!=undefined) {
     bining.thresholds(config.binCount)
  } else {
    if (new Set(config.value).size<=2) {
     bining.thresholds(1)
    } else {
    }
  }
  let altBSize = undefined
  let bined = bining(config.value)
  let scaled = Object.fromEntries(bined.map(x=>[x.x0/(altBSize=x.x1-x.x0),x.length]))
  console.log(config.title,"  "+altBSize, scaled)
  return histogramSlider ({
    w:400, h:100, bucketSize: altBSize, scaleY: d3.scaleLog(), lowerY:1,
    ...config,
    value: scaled
  });
}
)});
  const child8 = runtime.module(define8);
  main.import("histogramSlider", child8);
  main.import("histogramSliderRaw", child8);
  main.variable(observer()).define(["md"], function(md){return(
md`### Too many things to draw`
)});
  const child9 = runtime.module(define9).derive([{name: "rawdata", alias: "data"},{name: "continuousDom", alias: "columns"}], main);
  main.import("chart", "scatterPlotMatrixChart", child9);
  return main;
}
