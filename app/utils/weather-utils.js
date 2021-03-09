export const formatTemp = (temp) => {
  return `${Math.round(temp)}`;
};

export const formatWeatherDescription = (description) => {
  return `${description[0].toUpperCase()}${description.slice(1)}`;
};

export const formatWindSpeed = (speed) => {
  return `${Math.round(speed * 3.6)}`;
};
