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

const pushStateToUrl = <T extends string>({ key, value }: { key: string, value: T }) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  window.history.pushState({}, '', `?${searchParams.toString()}`);
};

const getStateFromUrl = <T extends string>({ key }: { key: string }) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key) as T;
};

export {
  dateToLocaleTimeString,
  convertSecondsToHHMMSS,
  calcTimeDiffFromNowInSec,
  pushStateToUrl,
  getStateFromUrl,
};
