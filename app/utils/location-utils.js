export const areSameLocations = (x, y) => {
  return x.lat === y.lat && x.lon === y.lon;
};

export const formatLocatioName = (name) => {
  return name[0].toUpperCase() + name.slice(1);
};
