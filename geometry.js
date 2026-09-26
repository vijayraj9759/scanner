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

function getRangeEnd(start, range) {
  return start + range;
}

function directionOfOffset(st, range, startEdgePoint, endEdgePoint, currentOffset) {
  return isEdge(st, range, startEdgePoint, endEdgePoint) ? -currentOffset : currentOffset;
}

module.exports = {
  isEdge,
  isOverlapping,
  getRangeEnd,
  directionOfOffset,
}