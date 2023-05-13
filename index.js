const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
//const {storeTempers} = require("./src/controllers/temperController.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  //storeTempers();
server.listen(PORT, () => {
    console.log(`listening at ${PORT}`); // eslint-disable-line no-console
  });
});