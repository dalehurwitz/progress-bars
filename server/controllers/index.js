const { generateBars } = require("../utils");

exports.generateBars = function(req, res, next) {
  res.json(generateBars());
};
