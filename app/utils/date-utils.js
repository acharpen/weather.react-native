export const formatTimeStampToFullDate = (date) => {
  const dayOfWeek = date.format('dddd');

  return `${dayOfWeek[0].toUpperCase()}${dayOfWeek.slice(1)} ${date.format(
    'DD/MM/YYYY',
  )}`;
};

export const formatTimeStampToFullDateTime = (date) => {
  return `${formatTimeStampToFullDate(date)} à ${date.format('H')}h`;
};
