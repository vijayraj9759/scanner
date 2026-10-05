const r = require("raylib");
const d = require("./detector.js");
const p = require("./particle.js");

function update(world) {
    d.updateV(world.detectorA, world.particleA, world.particleB);
    d.updateV(world.detectorB, world.particleA, world.particleB);

    d.updateH(world.detectorC, world.particleC);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(world.particleA);
    p.draw(world.particleB);
    p.draw(world.particleC);

    d.draw(world.detectorA);
    d.draw(world.detectorB);
    d.draw(world.detectorC);

    r.EndDrawing();
}

function setup(width, height) {
    r.SetTraceLogLevel(r.LOG_NONE);
    const FPS = 60;

    r.InitWindow(width, height, "Scanner");
    r.SetTargetFPS(FPS);

    let detectorA = d.create(0, 0, 10, height, 0, width / 2, 3, "Vertical");
    let detectorB = d.create(
        width / 2,
        0,
        30,
        height,
        width / 2,
        width,
        2,
        "Vertical",
    );
    let detectorC = d.create(0, 0, width, 20, 0, height, 4, "Horizontal");

    let particleA = p.create(100, 0, 100, height);
    let particleB = p.create(400, 0, 200, height);
    let particleC = p.create(0, 200, width, 100);

    return { detectorA, detectorB, detectorC, particleA, particleB, particleC };
}

function running() {
    return !r.WindowShouldClose();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    update,
    draw,
    running,
    teardown,
};
