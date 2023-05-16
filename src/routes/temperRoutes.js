const Router = require("express");
const {getAllTempers} = require("../controllers/temperController");

const router = Router();

 router
.get("/", getAllTempers);

module.exports = router;
