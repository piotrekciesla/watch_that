export function debounce(fn: () => any, delay: number) {
  let timeoutID: number;
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    timeoutID = setTimeout(function () {
      fn.apply(args);
    }, delay);
  };
}
