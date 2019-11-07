// code away!
const server = require("./server");
require('dotenv').config();

server.listen(process.env.PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${process.env.PORT} ***\n`);
});