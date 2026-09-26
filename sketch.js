const r = require("raylib");
const geometry = require("./geometry.js");

const windowWidth = 1000;
const windowHeight = 800;

let directionOffset = 1;

const scannerRange = 50;
let scannerStart = 0;

const particleRange = 100;
const particleStart = 200;

function createObject(start, range, color) {
  r.DrawRectangle(start, 0, range, windowHeight, color);
}

function setup() {
  const FPS = 60;

  r.InitWindow(windowWidth, windowHeight, "Scanner");
  r.SetTargetFPS(FPS);
}

function update() {
  scannerStart = scannerStart + directionOffset;
  directionOffset = geometry.isEdge(scannerStart, scannerRange, windowWidth) ? -directionOffset : directionOffset;
}


function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  createObject(particleStart, particleRange, r.SKYBLUE);
  createObject(scannerStart, scannerRange, r.WHITE);

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