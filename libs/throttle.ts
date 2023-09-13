const throttle = (func: (args: unknown) => void, delay: number) => {
  let time = Date.now();
  return (...args: unknown[]) => {
    if ((time + delay - Date.now()) <= 0) {
      func(args);
      time = Date.now();
    }
  };
};

export default throttle;
