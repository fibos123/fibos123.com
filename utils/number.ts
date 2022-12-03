export const formatNumber = (num: number): string => {
  if ("number" !== typeof num) {
    return "";
  }
  return num.toLocaleString();
};

export const formatPercent = (num: number): string => {
  return num.toFixed(2);
};
