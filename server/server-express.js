const path = require('path')
const express = require("express");
const routes = require("./routes");
const { notFound } = require("./middleware/errors");
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.use("/", routes);
app.use(notFound);

app.listen(6060, function() {
  console.log(`Express server running on port ${this.address().port}`);
});
