const Router = require("express");
const {createDog, getAllDogs, getDogByName, getDogById} = require("../controllers/dogController");
const getAllDogsFromApi = require("../controllers/dogControllerApi");
const router = Router();

router
.get("/", getAllDogsFromApi)
.get("/id/:id", getDogById)
.get("/name", getDogByName)
.post("/", createDog);

module.exports = router;