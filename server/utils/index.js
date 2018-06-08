function randomIntInRange (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

exports.generateBars = function () {
  const numButtons = randomIntInRange(4, 6);
  const numBars = randomIntInRange(2, 5);
  let buttons = [],
    bars = [];

  while (buttons.length < numButtons) {
    buttons.push(randomIntInRange(-50, 50));
  }

  while (bars.length < numBars) {
    bars.push(randomIntInRange(0, 100));
  }

  return {
    buttons, bars
  }
}
