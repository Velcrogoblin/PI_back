const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const {uploadTempers} = require("./src/controllers/temperController.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
uploadTempers();
server.listen(PORT, () => {
    console.log(`listening at ${PORT}`); // eslint-disable-line no-console
  });
});