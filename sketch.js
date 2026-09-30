const r = require("raylib");
const d = require("./detector.js");
const dA = require("./detectorA.js");
const dB = require("./detectorB.js");
const dC = require("./detectorC.js");
const p = require("./particles.js");

function calculateDetectorVelocity(
    start,
    width,
    lowerBound,
    upperBound,
    velocity,
) {
    const lowerEdge = lowerBound + width;
    const upperEdge = upperBound - (lowerEdge + width);

    return !isOverlapping(start, width, lowerEdge, upperEdge)
        ? -velocity
        : velocity;
}

function isOverlapping(r1Start, r1Width, r2Start, r2Width) {
    const r1End = r1Start + r1Width;
    const r2End = r2Start + r2Width;

    return !(r1End < r2Start || r1Start > r2End);
}

function isOverlappingWithAnyFields(dtStart, dtWidth) {
    return (
        isOverlapping(dtStart, dtWidth, p.particleA_x, p.particleA_width) ||
        isOverlapping(dtStart, dtWidth, p.particleB_x, p.particleB_width)
    );
}

function update() {
    dA.velocity = calculateDetectorVelocity(
        dA.x,
        dA.width,
        dA.lowerBound,
        dA.upperBound,
        dA.velocity,
    );
    dA.x = d.calculatePosition(dA.x, dA.velocity);
    dA.hasDetected = isOverlappingWithAnyFields(dA.x, dA.width);

    dB.velocity = calculateDetectorVelocity(
        dB.x,
        dB.width,
        dB.lowerBound,
        dB.upperBound,
        dB.velocity,
    );
    dB.x = d.calculatePosition(dB.x, dB.velocity);
    dB.hasDetected = isOverlappingWithAnyFields(dB.x, dB.width);

    dC.velocity = calculateDetectorVelocity(
        dC.y,
        dC.height,
        dC.lowerBound,
        dC.upperBound,
        dC.velocity,
    );
    dC.y = d.calculatePosition(dC.y, dC.velocity);
    dC.hasDetected = isOverlapping(
        dC.y,
        dC.height,
        p.particleC_y,
        p.particleC_height,
    );
}

function drawScanner(x, y, width, height, hasDetected) {
    if (hasDetected) r.DrawRectangle(x, y, width, height, r.RED);
    else r.DrawRectangle(x, y, width, height, r.WHITE);
}

function drawParticle(x, y, width, height) {
    r.DrawRectangle(x, y, width, height, r.SKYBLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticle(
        p.particleA_x,
        p.particleA_y,
        p.particleA_width,
        p.particleA_height,
    );
    drawParticle(
        p.particleB_x,
        p.particleB_y,
        p.particleB_width,
        p.particleB_height,
    );
    drawParticle(
        p.particleC_x,
        p.particleC_y,
        p.particleC_width,
        p.particleC_height,
    );

    drawScanner(dA.x, dA.y, dA.width, dA.height, dA.hasDetected);
    drawScanner(dB.x, dA.y, dB.width, dA.height, dB.hasDetected);
    drawScanner(dC.x, dC.y, dC.width, dC.height, dC.hasDetected);

    r.EndDrawing();
}

function initializeDetector(width, height) {
    dA.x = 0;
    dA.y = 0;
    dA.width = 10;
    dA.height = height;
    dA.lowerBound = 0;
    dA.upperBound = width / 2;

    dB.x = width / 2;
    dB.y = 0;
    dB.width = 30;
    dB.height = height;
    dB.lowerBound = width / 2;
    dB.upperBound = width;

    dC.x = 0;
    dC.y = 0;
    dC.width = width;
    dC.height = 20;
    dC.lowerBound = 0;
    dC.upperBound = height;
}

function initializeParticles(width, height) {
    p.particleA_height = height;
    p.particleB_height = height;
    p.particleC_width = width;
}

function setup(width, height) {
    r.SetTraceLogLevel(r.LOG_NONE);
    const FPS = 60;

    r.InitWindow(width, height, "Scanner");
    r.SetTargetFPS(FPS);

    initializeDetector(width, height);
    initializeParticles(width, height);
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
