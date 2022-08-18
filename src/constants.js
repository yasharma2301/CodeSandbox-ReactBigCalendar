export const isPassedDateOfThisMonth = (date) => {
  const isCurrentMonth = new Date(date).getMonth() === new Date().getMonth();
  const isPreviousDate = new Date(date).getDate() < new Date().getDate();

  return isCurrentMonth && isPreviousDate;
};

export const isPassedDate = (date) => {
  const isPreviousMonth = new Date(date).getMonth() < new Date().getMonth();
  const isPreviousDate = new Date(date).getDate() < new Date().getDate();

  if (isPreviousMonth) return true;
  else if (!isPreviousMonth && isPreviousDate) return true;
  return false;
};
