export const lineNumbers = (code) => {
  var lines     = code.split("\n");
  var end       = lines.length;
  var width     = String(end).length
  var numbered  = lines.map(function(line, index) {
    return `<span class="lineNum" data-line-number="${String(index+1).padStart(width, ' ')}"></span>${line}`;
  })
  return numbered.join("\n");
}