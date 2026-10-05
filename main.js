const sketch = require("./sketch.js");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const WIDTH = 1000;
    const HEIGHT = 800;

    const world = sketch.setup(WIDTH, HEIGHT);
    loop(world);
    sketch.teardown();
}

main();
