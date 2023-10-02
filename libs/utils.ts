const dataToLocaleTimeString = (date: number) => new Date(date * 1000).toLocaleTimeString('fi-FI', {
  timeZoneName: 'short',
  hour12: false,
});

export {
  // eslint-disable-next-line import/prefer-default-export
  dataToLocaleTimeString,
};
