interface dateObject {
  date: Date;
  currentMonth: Boolean;
}

export const generateCalendar = (
  month: number = new Date().getMonth(),
  year: number = new Date().getFullYear()
): dateObject[] => {
  const firstDateOfCurrentMonth = new Date(year, month, 1);
  const lastDateOfCurrentMonth = new Date(year, month + 1, 0);
  const lastDateOfPreviousMonth = new Date(year, month, 0);

  const arrayOfDates: dateObject[] = [];

  // Adding current month to the array
  for (
    let i = firstDateOfCurrentMonth.getDate();
    i <= lastDateOfCurrentMonth.getDate();
    i++
  ) {
    arrayOfDates.push({
      date: new Date(year, month, i),
      currentMonth: true,
    });
  }

  // Adding previous month to the array
  for (let i = 0; i < firstDateOfCurrentMonth.getDay() - 1; i++) {
    arrayOfDates.unshift({
      date: new Date(
        lastDateOfPreviousMonth.getFullYear(),
        lastDateOfPreviousMonth.getMonth(),
        lastDateOfPreviousMonth.getDate() - i
      ),
      currentMonth: false,
    });
  }

  const nextMonthLength = 42 - arrayOfDates.length;
  // Adding next month to the array
  for (let i = 1; i <= nextMonthLength; i++) {
    arrayOfDates.push({
      date: new Date(year, month + 1, i),
      currentMonth: false,
    });
  }

  return arrayOfDates;
};
