function isEdge(currentPos, width, edgePoint) {
  if (currentPos === 0) return true;

  if (currentPos + width === edgePoint) return true;

  return false;
}

function isOverlapping(rangeOneSt, rangeOneEnd, rangeTwoSt, rangeTwoEnd) {
  if (rangeOneEnd < rangeTwoSt) return false;
  if (rangeTwoEnd < rangeOneSt) return false;

  return true;
}

module.exports = {
  isEdge,
  isOverlapping,
}