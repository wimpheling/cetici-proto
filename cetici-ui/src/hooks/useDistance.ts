export const useDistanceFormatter = (distanceInMeters: number) => {
  if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)}m`;
  } else if (distanceInMeters < 10000) {
    return `${distanceInMeters.toFixed(2)}km`;
  } else {
    return `${Math.round(distanceInMeters)}km`;
  }
};
