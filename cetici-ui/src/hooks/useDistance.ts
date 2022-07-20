export const useDistanceFormatter = (distanceInMeters: number) => {
  if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)}m`;
  } else if (distanceInMeters < 10000) {
    return `${(distanceInMeters / 1000).toFixed(2)}km`;
  } else {
    return `${Math.round(distanceInMeters / 1000)}km`;
  }
};
