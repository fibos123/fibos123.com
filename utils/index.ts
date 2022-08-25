const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

const formatPercent = (num: number): string => {
  return num.toFixed(2);
};

const formatDate = (value: string | number): string => {
  let date;
  if ("string" === typeof value) {
    const isZChar = value.toString().slice(-1) === "Z";
    if (!isZChar) {
      value = value + "Z";
    }
  }
  date = new Date(value);

  const dateString = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date);
  return dateString;
};

export default { formatNumber, formatPercent, formatDate };
