const r = require("raylib");
const d = require("./detector.js");
const dA = require("./detectorA.js");
const dB = require("./detectorB.js");
const dC = require("./detectorC.js");
const p = require("./particles.js");

function overlapFields(st, width) {
  return (
    isOverlap(st, width, p.particleA_x, p.particleA_width) ||
    isOverlap(st, width, p.particleB_x, p.particleB_width)
  )
}

function isOverlap(st1, width1, st2, width2) {
  const end1 = st1 + width1;
  const end2 = st2 + width2;

  return !((end1 < st2) || (st1 > end2));
}

function update() {
  dA.velocity = d.calculateVelocity(dA.x, dA.width, dA.lower, dA.upper, dA.velocity);
  dA.x = d.calculatePosition(dA.x, dA.velocity);

  dB.velocity = d.calculateVelocity(dB.x, dB.width, dB.lower, dB.upper, dB.velocity);
  dB.x = d.calculatePosition(dB.x, dB.velocity);

  dC.velocity = d.calculateVelocity(dC.y, dC.height, dC.lower, dC.upper, dC.velocity);
  dC.y = d.calculatePosition(dC.y, dC.velocity);

  dA.hasDetected = overlapFields(dA.x, dA.width);
  dB.hasDetected = overlapFields(dB.x, dB.width);
  dC.hasDetected = isOverlap(dC.y, dC.height, p.particleC_y, p.particleC_height);
}

function drawRangeH(x, width, color) {
  r.DrawRectangle(x, 0, width, r.GetScreenHeight(), color);
}

function drawRangeV(y, height, color) {
  r.DrawRectangle(0, y, r.GetScreenHeight(), height, color);
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  // drawRangeH(p.particleA_x, p.particleA_width, r,r.SKYBLUE);
  r.DrawRectangle(p.particleA_x, 0, p.particleA_width, 800, r.SKYBLUE);
  r.DrawRectangle(p.particleB_x, 0, p.particleB_width, 800, r.SKYBLUE);
  r.DrawRectangle(0, p.particleC_y, 1000, p.particleC_height, r.SKYBLUE);

  r.DrawRectangle(dA.x, 0, dA.width, r.GetScreenWidth(), d.chooseColor(dA.hasDetected));
  r.DrawRectangle(dB.x, 0, dB.width, r.GetScreenHeight(), d.chooseColor(dB.hasDetected));
  r.DrawRectangle(0, dC.y, r.GetScreenWidth(), dC.height, d.chooseColor(dC.hasDetected));

  r.EndDrawing();
}

function setup(WIDTH, HEIGHT) {
  r.SetTraceLogLevel(r.LOG_NONE);
  const FPS = 60;

  r.InitWindow(WIDTH, HEIGHT, "Scanner");
  r.SetTargetFPS(FPS);

  dA.x = 0;
  dA.lower = 0;
  dA.upper = WIDTH / 2;

  dB.x = WIDTH / 2;
  dB.lower = WIDTH / 2;
  dB.upper = WIDTH;

  dC.y = 0;
  dC.lower = 0;
  dC.upper = HEIGHT;

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