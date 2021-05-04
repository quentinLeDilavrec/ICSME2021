// https://observablehq.com/@quentinledilavrec/inputs-in-grid@309
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Inputs in grid `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Just a quick wrapper around [jashkenas/inputs](https://observablehq.com/@jashkenas/inputs) , so it's possible to position inputs in a grid.

Does not work for all inputs (multi checkboxes and canvas based inputs, like location coordinate picker ) , but it's enough for my needs for now.

We get result as array, which has additional properties attached for naming convenience (if you pass names array as a second parameter)
`
)});
  main.variable(observer()).define(["values"], function(values){return(
values
)});
  main.variable(observer("viewof values")).define("viewof values", ["inputsGroup","slider","width","select"], function(inputsGroup,slider,width,select){return(
inputsGroup(
  
[
  [
   slider({'title':'test1',description:'description1'}),
   slider({'title':'test2',description:'description2'}),
   slider({'title':'test3',description:'description3'}),
  ],
  [
   slider({'title':'test4',description:'description4'}),
   slider({'title':'test5',description:'description5'}),
   slider({'title':'test6',description:'description6'}),
  ],
  [ 
   `<div style="height:50px;width:${width/2-100}px"></div>`,  //  Just a trick, to make select element centered
    select(['test','name']),
  ]
],
                            
[
  ['first-input','second-input','third-slider'],
  ['4-th','5-th','6-th'],
  ['','select']
]
                           
)
)});
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer("inputsGroup")).define("inputsGroup", ["html"], function(html){return(
function inputsGroup(views,names, options={rowStyle:"display:inline-block;min-width:300px"}){
  const form = html`<div class="inputs-group">${
    views.map(row => html`<div  class="inputs-group-row">${
      row.map(input => html`<div  class="inputs-group-cell" style="${options.rowStyle}">${input}</div>`)
    }</div>`)
  }</div>`;
  
  form.oninput = () => {
    form.value = views.map(row => row.map(input => input.value))
    if(names){
      names.forEach((row,i)=>row.forEach((c,j)=> form.value[i][j]!=null && (form.value[c]=form.value[i][j])))
    }
  };
  form.oninput();
  return form;
}
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("select", child1);
  return main;
}
