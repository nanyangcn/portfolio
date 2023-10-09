const dateToLocaleTimeString = (date: number) => new Date(date * 1000).toLocaleTimeString('fi-FI', {
  timeZoneName: 'short',
  hour12: false,
});

const convertSecondsToHHMMSS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${
    String(minutes).padStart(2, '0')
  }:${String(remainingSeconds).padStart(2, '0')}`;

  return formattedTime;
};

const calcTimeDiffFromNowInSec = (date: number) => {
  const now = Date.now() / 1000;
  const diff = Math.floor(date - now);
  return diff;
};

export {
  dateToLocaleTimeString,
  convertSecondsToHHMMSS,
  calcTimeDiffFromNowInSec,
};
