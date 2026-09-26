const r = require("raylib");
const geometry = require("./geometry.js");

const windowWidth = 1000;
const windowHeight = 800;

let directionOffset = 1;

const detectorRange = 50;
let detectorStart = 0;

const particleRange = 100;
const particleStart = 100;

function createObject(start, range, color) {
  r.DrawRectangle(start, 0, range, windowHeight, color);
}

function chooseColor() {
  return geometry.isOverlapping(detectorStart, detectorStart + detectorRange, particleStart, particleStart + particleRange) ? r.RED : r.WHITE;
}

function setup() {
  const FPS = 60;

  r.InitWindow(windowWidth, windowHeight, "Scanner");
  r.SetTargetFPS(FPS);
}

function update() {
  detectorStart = detectorStart + directionOffset;
  directionOffset = geometry.isEdge(detectorStart, detectorRange, windowWidth) ? -directionOffset : directionOffset;
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  const detectorColor = chooseColor();

  createObject(particleStart, particleRange, r.SKYBLUE);
  createObject(detectorStart, detectorRange, detectorColor);

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
