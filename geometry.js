function isEdge(currentPos, width, edgePoint) {
  if (currentPos === 0) return true;

  if (currentPos + width === edgePoint) return true;

  return false;
}

module.exports = {
  isEdge,
}