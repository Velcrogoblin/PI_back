const {Temper} = require("../db");
const axios = require ("axios");
const { API_URL } = process.env;

 let dbTempers = [];
 let allTempers = [];

const storeTempers = async () => {
        const response = await axios.get(API_URL);
        let dogsReturned = response.data.map(dog => dog.temperament).filter(temperament => temperament);
        dogsReturned = dogsReturned.flat();

        for( let i = 0; i < dogsReturned.length; i++) {
            dbTempers.push(dogsReturned[i].split(", "))    
        }

        dbTempers = dbTempers.flat();
        let temperaments = new Set(dbTempers);
        let aux = Array.from(temperaments);
        

        for (let i = 0; i < aux.length; i++) {
            allTempers.push({temper_name: aux[i]});
        }
        } 


const fillDbTempers = async () => {
    try {
      await Temper.bulkCreate(allTempers);
      console.log("Temperamentos cargados");
    } catch (error) {
      console.error(error)
    }
};

const uploadTempers = async () => {
    await storeTempers();
    await fillDbTempers();
}

const getAllTempers = async(req, res) => {
    try{
        let response = await Temper.findAll();
        console.log(response);
        if(response.length === 0) {
            return res.status(404).json({message: "No tempers where found"});
        }

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}


module.exports = {
    uploadTempers,
    storeTempers,
    getAllTempers,
}