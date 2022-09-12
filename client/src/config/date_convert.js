const months = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]);

export const convertDateToString = (date) => {
  const dateString = new Date(date);

  return `${
    months[dateString.getMonth()]
  } ${dateString.getDate()}, ${dateString.getFullYear()}`;
};
