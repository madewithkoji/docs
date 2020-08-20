export const lineNumbers = (code) => {
  var lines = code.split("\n");
  if (lines.length <= 1) return code;
  var width = String(lines.length).length
  var numbered = lines.map(function(line, index) {
    return `<span class="lineNum" data-line-number="${String(index+1).padStart(width, ' ')}"></span>${line}`;
  })
  return numbered.join("\n");
}