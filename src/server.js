const app = require("./index");
const connect = require("../src/config/db");

app.listen(2525, async () => {
  await connect();
  console.log("listing on port 2525");
});
