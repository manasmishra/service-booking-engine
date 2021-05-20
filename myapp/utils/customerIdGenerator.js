const getId = (function incrementor() {
  let cnt = 0;
  return function () {
    cnt += 1;
    return cnt;
  };
})();

module.exports = {
  getId,
};
