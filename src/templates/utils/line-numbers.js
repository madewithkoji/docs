export const lineNumbers = (block) => {
  let code = block.innerHTML;
  var lines = code.split("\n");
  var width = String(lines.length).length
  var numbered = lines.map(function(line, index) {
    return `<span class="lineNum" data-line-number="${String(index+1).padStart(width, ' ')}"></span>${line}`;
  })
  block.innerHTML = numbered.join("\n");
}