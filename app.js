function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPallindrome(str) {
  return str === reverseStr(str);
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };
  dateStr.day = date.day < 10 ? "0" + date.day : date.day.toString();
  dateStr.month = date.month < 10 ? "0" + date.month : date.month.toString();
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.day + dateStr.month;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, ddmmyy, yymmdd];
}

function checkPallindromeForAllDateFormats(date) {
  let listOfAllDateFormats = getAllDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfAllDateFormats.length; i++) {
    if (isPallindrome(listOfAllDateFormats[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let listOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    }
  } else {
    if (day > listOfDaysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPallindrome(date) {
  let count = 0;
  let nextDate = getNextDate(date);

  while (1) {
    count++;
    var isPallindrome = checkPallindromeForAllDateFormats(nextDate);
    if (isPallindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [count, nextDate];
}

const dateInput = document.querySelector("#input-date");
const srchBtn = document.querySelector(".srch-btn");
const output = document.querySelector(".output");

function clickHandler() {
  let inputDate = dateInput.value;

  if (inputDate !== "") {
    let listOfDate = inputDate.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPallindrome = checkPallindromeForAllDateFormats(date);

    if (isPallindrome) {
      output.innerText = "Yeah!!! Your birthady is pallindorme 😉";
    } else {
      let [count, nextDate] = getNextPallindrome(date);

      output.innerText = `The next pallindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by ${count} days 🙂`;
    }
  }
}

srchBtn.addEventListener("click", clickHandler);
