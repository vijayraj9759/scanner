const r = require("raylib");
const d = require("./detector.js");
const dA = require("./detectorA.js");
const dB = require("./detectorB.js");
const dC = require("./detectorC.js");

const particleA_x = 100;
const particleA_width = 100;

const particleB_x = 400;
const particleB_width = 200;

const particleC_y = 200;
const particleC_height = 100;

function overlapFields(st, width) {
  return (
    isOverlap(st, width, particleA_x, particleA_width) ||
    isOverlap(st, width, particleB_x, particleB_width)
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
  dC.hasDetected = isOverlap(dC.y, dC.height, particleC_y, particleC_height);
}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(particleA_x, 0, particleA_width, 800, r.SKYBLUE);
  r.DrawRectangle(particleB_x, 0, particleB_width, 800, r.SKYBLUE);
  r.DrawRectangle(0, particleC_y, 1000, particleC_height, r.SKYBLUE);

  r.DrawRectangle(dA.x, 0, dA.width, 800, d.chooseColor(dA.hasDetected));
  r.DrawRectangle(dB.x, 0, dB.width, 800, d.chooseColor(dB.hasDetected));
  r.DrawRectangle(0, dC.y, 1000, dC.height, d.chooseColor(dC.hasDetected));

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