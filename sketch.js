const r = require("raylib");
const geometry = require("./geometry.js");

const windowWidth = 1000;
const windowHeight = 800;

let directionOffset = 1;

let detectorSt = 0;
const detectorRange = 50;

function createObject(start, range, color) {
  r.DrawRectangle(start, 0, range, windowHeight, color);
}

function chooseColor(particleA_st, particleA_range, particleB_st, particleB_range) {
  const detectorEnd = detectorSt + detectorRange;

  const particleA_end = particleA_st + particleA_range;
  const particleB_end = particleB_st + particleB_range;

  const isOverlappingA = geometry.isOverlapping(detectorSt, detectorEnd, particleA_st, particleA_end);
  const isOverlappingB = geometry.isOverlapping(detectorSt, detectorEnd, particleB_st, particleB_end);

  return (isOverlappingA || isOverlappingB) ? r.RED : r.WHITE;
}

function setup() {
  const FPS = 60;

  r.InitWindow(windowWidth, windowHeight, "Scanner");
  r.SetTargetFPS(FPS);
}

function update() {
  detectorSt = detectorSt + directionOffset;
  directionOffset = geometry.isEdge(detectorSt, detectorRange, windowWidth) ? -directionOffset : directionOffset;
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  const particleA_st = 100;
  const particleA_range = 100;

  const particleB_st = 400;
  const particleB_range = 200;

  const detectorColor = chooseColor(particleA_st, particleA_range, particleB_st, particleB_range);

  createObject(particleA_st, particleA_range, r.SKYBLUE);
  createObject(particleB_st, particleB_range, r.SKYBLUE);
  createObject(detectorSt, detectorRange, detectorColor);

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
