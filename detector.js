const r = require("raylib");

function chooseColor(hasDetected) {
  return hasDetected ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
}

function calculatePosition(x, velocity) {
  return x + velocity;
}

function calculateVelocity(st, width, lower, upper, velocity) {
  return isOutOfBounds(st, width, lower, upper) ? -velocity : velocity;
}

function isOutOfBounds(st, width, lower, upper) {
  const end = st + width;

  return (st < lower) || (end > upper);
}

module.exports = {
  chooseColor,
  calculatePosition,
  calculateVelocity,
  isOutOfBounds,
}