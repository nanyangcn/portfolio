const throttle = <T>(func: (arg: T) => void, delay: number) => {
  let time = Date.now();
  return (arg: T) => {
    if (Date.now() - time >= delay) {
      func(arg);
      time = Date.now();
    }
  };
};

export default throttle;
