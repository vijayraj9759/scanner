function isEdge(currentPos, width, startEdgePoint, endEdgePoint) {
  if (currentPos <= startEdgePoint) return true;

  if (currentPos + width >= endEdgePoint) return true;

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