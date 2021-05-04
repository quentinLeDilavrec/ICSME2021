let buff = "";

function f(line){
	let [repo, stars, ...rel] = line.split(" ");
	rel.reverse();
	console.log([repo, stars, ...rel].join(" "));
}


process.stdin
   .on('data', data => {
          buff += data;
          lines = buff.split(/[\r\n|\n]/);
          buff = lines.pop();
          lines.forEach(line => f(line));
        })
   .on('end', () => {
          if (buff.length > 0) f(buff);
        });
