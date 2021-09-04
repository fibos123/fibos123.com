import dayjs from "dayjs";

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const formatPercent = (num: number): string => {
  return num.toFixed(2)
}

const formatDate = (date: string | number): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

export default { formatNumber, formatPercent, formatDate }
