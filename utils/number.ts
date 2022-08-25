export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatPercent = (num: number): string => {
  return num.toFixed(2);
};
