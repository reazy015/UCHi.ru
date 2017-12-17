window.utils = (function () {

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  }

  return getRandomNumber;
})();
