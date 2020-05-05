function dateValid(text) {
  const validDateT = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
  return validDateT.test(text);
}

function getTDate(date) {
  let dateText = date.split('/');
  let mydate = new Date(dateText[2], dateText[0] - 1, dateText[1]);
  return mydate.getTime();
}

function nullDays(date1, date2) {
  const day = 1000 * 60 * 60 * 24;
  const mathAbs = Math.abs(date1 - date2);
  return Math.round(mathAbs / day);
}

export {
  dateValid
  , getTDate
  , nullDays
};
