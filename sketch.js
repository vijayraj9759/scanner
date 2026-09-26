const r = require("raylib");
const geometry = require("./geometry.js");

const windowWidth = 1000;
const windowHeight = 800;

const halfWindowWidth = windowWidth / 2;

let speedA_offset = 1;
let speedB_offset = 3;

let detectorA_st = 0;
const detectorA_range = 50;

let detectorB_st = halfWindowWidth;
const detectorB_range = 30;

function createObject(start, range, color) {
  r.DrawRectangle(start, 0, range, windowHeight, color);
}

function chooseColor(detectorSt, detectorRange, particleA_st, particleA_range, particleB_st, particleB_range) {
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
  detectorA_st = detectorA_st + speedA_offset;
  speedA_offset = geometry.isEdge(detectorA_st, detectorA_range, 0, halfWindowWidth) ? -speedA_offset : speedA_offset;

  detectorB_st = detectorB_st + speedB_offset;
  speedB_offset = geometry.isEdge(detectorB_st, detectorB_range, halfWindowWidth, windowWidth) ? -speedB_offset : speedB_offset;
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  const particleA_st = 100;
  const particleA_range = 100;

  const particleB_st = 400;
  const particleB_range = 200;

  const detectorA_color = chooseColor(detectorA_st, detectorA_range, particleA_st, particleA_range, particleB_st, particleB_range);
  const detectorB_color = chooseColor(detectorB_st, detectorB_range, particleA_st, particleA_range, particleB_st, particleB_range);

  createObject(particleA_st, particleA_range, r.SKYBLUE);
  createObject(particleB_st, particleB_range, r.SKYBLUE);

  createObject(detectorA_st, detectorA_range, detectorA_color);
  createObject(detectorB_st, detectorB_range, detectorB_color);

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
