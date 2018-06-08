const express = require("express");
const routes = require("./routes");
const { notFound } = require("./middleware/errors");
const app = express();

app.use("/", routes);
app.use(notFound);

app.listen(6060, function() {
  console.log(`Express server running on port ${this.address().port}`);
});
