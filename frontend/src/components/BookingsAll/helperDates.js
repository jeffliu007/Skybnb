export const getYMD = (date) => {
  const [year, month, day] = date.split("-");
  const dateObj = {
    year,
    month,
    day,
  };
  return dateObj;
};

export const convertDate = (date) => {
  const newDate = new Date(date);
  const month = newDate
    .toLocaleDateString("default", { month: "long" })
    .slice(0, 3);
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month} ${day} ${year}`;
};

export const convertDates = (date) => {
  const [year, month, day] = date.split("-");
  const monthIndex = month - 1;
  const dateObj = new Date(year, monthIndex, day);
  return dateObj;
};

export const getMonth = (date) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleDateString("default", { month: "long" });
  return month.slice(0, 3);
};

export const daysToReservation = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);

  if (endDate) {
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    const convertToDays = difference / (1000 * 60 * 60 * 24);
    return Math.round(convertToDays);
  }

  const difference = start.getTime() - now.getTime();

  const convertToDays = difference / (1000 * 60 * 60 * 24);

  return Math.round(convertToDays);
};

export const defaultDates = (val) => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  const defaultStart = now;
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultEnd.getDate() + 5);

  if (val === "start") {
    return formatDate(defaultStart);
  } else {
    return formatDate(defaultEnd);
  }
};

export const formatDate = (day) => {
  const date = `0${day.getDate()}`.slice(-2);
  const month = `0${day.getMonth() + 1}`.slice(-2);
  const year = day.getFullYear();

  return `${year}-${month}-${date}`;
};

export const setEndDateChange = (start) => {
  const startDate = new Date(start);
  startDate.setDate(startDate.getDate() + 5);
  const endDate = startDate;

  return formatDate(endDate);
};
