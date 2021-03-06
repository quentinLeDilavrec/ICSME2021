// https://observablehq.com/@mbostock/copier@76
import define1 from "./a2e58f97fd5e8d7c@568.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","Copier"], function(md,Copier){return(
md`# Copier

A button to help copy snippets of text to the clipboard. To use in your notebook:

~~~js
import {Copier} from "@mbostock/copier"
~~~

${Copier("Copy import", {value: `import {Copier} from "@mbostock/copier"`})}`
)});
  main.variable(observer()).define(["Textarea"], function(Textarea){return(
Textarea({placeholder: "Now try pasting here."})
)});
  main.variable(observer()).define(["Copier"], function(Copier){return(
Copier("Click me!", {value: "Hello, world!"})
)});
  main.variable(observer()).define(["Copier"], function(Copier){return(
Copier([
  ["1", "I have eaten the plums that were in the icebox"],
  ["2", "and which you were probably saving for breakfast"],
  ["3", "Forgive me they were delicious so sweet and so cold"]
], {label: "Snippets"})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Implementation`
)});
  main.variable(observer()).define(["html","pbcopy"], function(html,pbcopy)
{
  let count = 0;
  return Object.assign(
    html`<button>Click me to copy text!`,
    {onclick: () => pbcopy(`Hello, world! ${++count}`)}
  );
}
);
  main.variable(observer("pbcopy")).define("pbcopy", function(){return(
function pbcopy(text) {
  const fake = document.body.appendChild(document.createElement("textarea"));
  fake.style.position = "absolute";
  fake.style.left = "-9999px";
  fake.setAttribute("readonly", "");
  fake.value = "" + text;
  fake.select();
  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    fake.parentNode.removeChild(fake);
  }
}
)});
  main.variable(observer("Copier")).define("Copier", ["pbcopy","Button"], function(pbcopy,Button){return(
function Copier(content = "Copy code", options) {
  if (Array.isArray(content)) content = Array.from(content, ([key, value]) => [key, () => (pbcopy(value), value)]);
  return Button(content, {...options, reduce: (value) => (pbcopy(value), value)});
}
)});
  main.variable(observer("copy")).define("copy", ["pbcopy"], function(pbcopy){return(
pbcopy
)});
  const child1 = runtime.module(define1);
  main.import("Button", child1);
  main.import("Textarea", child1);
  return main;
}
