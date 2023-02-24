export const minMaxMedianMean = (
  numbers: number[]
): {
  min: number;
  max: number;
  median: number;
  mean: number;
} => {
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const median =
    sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];
  const mean = sorted.reduce((num, curr) => (curr += num), 0) / sorted.length;

  return {
    min,
    max,
    median,
    mean,
  };
};

export const sum = (numbers: number[]): number => {
  let total = 0;
  numbers?.map((el) => (total += el));

  return total;
};

export const roundToTwoDecimalPlaces = (num: number) => {
  return Math.round(num * 100) / 100;
};
