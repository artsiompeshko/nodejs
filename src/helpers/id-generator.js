export default (start = 0) => () => {
  start += 1;
  return start;
};
