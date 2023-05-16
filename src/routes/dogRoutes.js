const Router = require("express");
const {createDog, getAllDogs, getDogByName, getDogById} = require("../controllers/dogController");
const router = Router();

router
.get("/", getAllDogs)
.get("/id/:id", getDogById)
.get("/name", getDogByName)
.post("/", createDog);

module.exports = router;