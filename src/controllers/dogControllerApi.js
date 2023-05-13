const { Dog, Op } = require("../db");
const axios = require ("axios");


let dogsFound = [];

const getAllDogsFromApi = async (req, res) => {
    try {
    
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");         
    const dogsReturned = response.data;
    dogsReturned.forEach(dog => dogsFound.push({name: dog.name, weight: dog.weight, height: dog.height, life_span: dog.life_span, image: dog.image}));
    return res.status(200).json(dogsFound);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}




module.exports = getAllDogsFromApi;