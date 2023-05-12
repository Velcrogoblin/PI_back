const {Temper} = require("../db");
const axios = require ("axios");


const storeTempers = async (req, res) => {

    let dbTempers = [];

    try{
        const response = await axios.get("https://api.thedogapi.com/v1/breeds");
        const dogsReturned = response.data;

        for( let i=0; i < dogsReturned.length; i++) {
            let aux = dogsReturned[i].temperament;
            let temperamentsFound = aux.split(", ");
            temperamentsFound.forEach(e => dbTempers.push({temper_name: e}))
          }

        
          const fillDbTempers = async () => {
          try {
            await Temper.bulkCreate(dbTempers);
            console.log("Temperamentos cargados");
          } catch (error) {
            console.error(error)
          }
          
          
          };
        
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

const getAllTempers = async(req, res) => {
    try{

        let response = Temper.findAll();

        if(response.length === 0) {
            return res.status(400).json({message: "No tempers where found"});
        }

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
}


module.exports = storeTempers