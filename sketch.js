const r = require("raylib");
const dA = require("./detectorA.js");

const detectorB_width = 30;
let detectorB_x;
let velocityB = 3;
let detectorB_lower;
let detectorB_upper;
let detectorB_hasDetected = false;

const detectorC_width = 30;
let detectorC_x;
let velocityC = 4;
let detectorC_lower;
let detectorC_upper;
let detectorC_hasDetected = false;

const particleA_x = 100;
const particleA_width = 100;

const particleB_x = 400;
const particleB_width = 200;

const particleC_x = 0;
const particleC_width = 100;

function setup(WIDTH, HEIGHT) {
  const FPS = 60;

  r.InitWindow(WIDTH, HEIGHT, "Scanner");
  r.SetTargetFPS(FPS);

  dA.x = 0;
  dA.lower = 0;
  dA.upper = WIDTH / 2;

  detectorB_x = WIDTH / 2;
  detectorB_lower = WIDTH / 2;
  detectorB_upper = WIDTH;

}

function isDetectorOutOfBounds(st, width, lower, upper) {
  const end = st + width;

  return (st < lower) || (end > upper);
}

function calculateDetectorVelocity(st, width, lower, upper, velocity) {
  return isDetectorOutOfBounds(st, width, lower, upper) ? -velocity : velocity;
}

function calculateDetectorPosition(x, velocity) {
  return x + velocity;
}

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
  dA.velocity = calculateDetectorVelocity(dA.x, dA.width, dA.lower, dA.upper, dA.velocity);
  dA.x = calculateDetectorPosition(dA.x, dA.velocity);

  velocityB = calculateDetectorVelocity(detectorB_x, detectorB_width, detectorB_lower, detectorB_upper, velocityB);
  detectorB_x = calculateDetectorPosition(detectorB_x, velocityB);

  dA.hasDetected = overlapFields(dA.x, dA.width);
  detectorB_hasDetected = overlapFields(detectorB_x, detectorB_width);
}

function chooseColor(hasDetected) {
  return hasDetected ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawRectangle(particleA_x, 0, particleA_width, 800, r.SKYBLUE);
  r.DrawRectangle(particleB_x, 0, particleB_width, 800, r.SKYBLUE);
  // r.DrawRectangle(0, particleC_x, WIDTH, particleC_width, r.SKYBLUE);

  r.DrawRectangle(dA.x, 0, dA.width, 800, chooseColor(dA.hasDetected));
  r.DrawRectangle(detectorB_x, 0, detectorB_width, 800, chooseColor(detectorB_hasDetected));
  // r.DrawRectangle(0, detectorC_x, WIDTH, detectorC_width, detectorC_color);

  r.EndDrawing();
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