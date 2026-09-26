const r = require("raylib");
const geometry = require("./geometry.js");

const windowWidth = 1000;
const windowHeight = 800;

const halfWindowWidth = windowWidth / 2;

let speedA_offset = 1;
let speedB_offset = 3;
let speedC_offset = 4;

let detectorA_st = 0;
const detectorA_range = 50;

let detectorB_st = halfWindowWidth;
const detectorB_range = 30;

let detectorC_st = 0;
const detectorC_range = 30;

function setup() {
  const FPS = 60;

  r.InitWindow(windowWidth, windowHeight, "Scanner");
  r.SetTargetFPS(FPS);
}

function update() {
  detectorA_st = detectorA_st + speedA_offset;
  speedA_offset = geometry.directionOfOffset(detectorA_st, detectorA_range, 0, halfWindowWidth, speedA_offset);

  detectorB_st = detectorB_st + speedB_offset;
  speedB_offset = geometry.directionOfOffset(detectorB_st, detectorB_range, halfWindowWidth, windowWidth, speedB_offset);

  detectorC_st = detectorC_st + speedC_offset;
  speedC_offset = geometry.directionOfOffset(detectorC_st, detectorC_range, 0, windowHeight, speedC_offset);
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  const detectorA_end = geometry.getRangeEnd(detectorA_st, detectorA_range);
  const detectorB_end = geometry.getRangeEnd(detectorB_st, detectorB_range);
  const detectorC_end = geometry.getRangeEnd(detectorC_st, detectorC_range);

  const particleA_st = 100;
  const particleA_range = 100;
  const particleA_end = geometry.getRangeEnd(particleA_st, particleA_range);

  const particleB_st = 400;
  const particleB_range = 200;
  const particleB_end = geometry.getRangeEnd(particleB_st, particleB_range);

  const particleC_st = 0;
  const particleC_range = 100;
  const particleC_end = geometry.getRangeEnd(particleC_st, particleC_range);

  const detectorA_Overlap = geometry.isOverlapping(detectorA_st, detectorA_end, particleA_st, particleA_end) || geometry.isOverlapping(detectorA_st, detectorA_end, particleB_st, particleB_end);
  const detectorB_Overlap = geometry.isOverlapping(detectorB_st, detectorB_end, particleA_st, particleA_end) || geometry.isOverlapping(detectorB_st, detectorB_end, particleB_st, particleB_end);
  const detectorC_Overlap = geometry.isOverlapping(detectorC_st, detectorC_end, particleC_st, particleC_end);

  const detectorA_color = detectorA_Overlap ? r.RED : r.WHITE;
  const detectorB_color = detectorB_Overlap ? r.RED : r.WHITE;
  const detectorC_color = detectorC_Overlap ? r.RED : r.WHITE;

  r.DrawRectangle(particleA_st, 0, particleA_range, windowHeight, r.SKYBLUE);
  r.DrawRectangle(particleB_st, 0, particleB_range, windowHeight, r.SKYBLUE);
  r.DrawRectangle(0, particleC_st, windowWidth, particleC_range, r.SKYBLUE);

  r.DrawRectangle(detectorA_st, 0, detectorA_range, windowHeight, detectorA_color);
  r.DrawRectangle(detectorB_st, 0, detectorB_range, windowHeight, detectorB_color);
  r.DrawRectangle(0, detectorC_st, windowWidth, detectorC_range, detectorC_color);

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