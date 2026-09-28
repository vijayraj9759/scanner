const sketch = require("./sketch.js");

function loop() {
  while (sketch.running()) {
    sketch.update();
    sketch.draw();
  }
}

function main() {
  const WIDTH = 1000;
  const HEIGHT = 800;

  sketch.setup(WIDTH, HEIGHT);
  loop();
  sketch.teardown();
}

main();