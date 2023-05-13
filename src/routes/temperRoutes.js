const Router = require("express");
const {storeTempers} = require("../controllers/temperController");

const router = Router();

router
.get("/", storeTempers);

module.exports = router;
