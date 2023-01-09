function checkOfflinePeriod(dateString) {
  const offlineDate = new Date(dateString);
  const now = Date.now();
  const diff = (now - offlineDate) / (1000 * 60 * 60 * 24);
  return diff > 120;
}

export default checkOfflinePeriod;
