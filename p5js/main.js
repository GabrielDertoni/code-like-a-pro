
const supercode = 10;
const supercodeDelay = 50;

const font_size = 25;

let char_index = 3;
let line_index = 2;
let code;
async function preload() {
  code = await loadStrings('code/cpp.txt');
  // code.split(',');
}

function setup() {
  // const cnv = createCanvas(displayWidth, displayHeight);
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('canvas-container');

}
function draw() {
  background(0);

  for (let i = 0; i <= line_index; i++) {
    textSize(font_size);
    fill(0, 255, 0);
    if (i === line_index)
      text(code[i].substr(0, char_index), 0, 100 + font_size * i);
    else
      text(code[i], 0, 100 + font_size * i);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  nextChar();
  if (supercode > 0) {
    let curr = supercode;
    setTimeout(
      recursiveSupercode,
      supercodeDelay,
      {
        curr: supercode,
        timeout: supercodeDelay
      });
  }
  // console.log(char_index, line_index, code[line_index].length, code[line_index]);
}
function recursiveSupercode({ curr, timeout }) {
  if (curr - 1 > 0) {
    nextChar();
    setTimeout(recursiveSupercode, timeout, { curr: curr - 1, timeout: timeout });
  }
}
function nextChar() {
  do {
    char_index++;
    if (char_index >= code[line_index].length) {
      char_index = 0;
      line_index = Math.min(line_index + 1, code.length - 1);
    }
  } while (code[line_index][char_index] === " ")
}