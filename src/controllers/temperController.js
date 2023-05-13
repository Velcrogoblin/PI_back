const {Temper} = require("../db");
const axios = require ("axios");

 let dbTempers = [];

const storeTempers = async (req, res) => {
    try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds");
        let dogsReturned = response.data.map(dog => dog.temperament).filter(temperament => temperament);
        dogsReturned = dogsReturned.flat();

        for( let i = 0; i < dogsReturned.length; i++) {
            dbTempers.push(dogsReturned[i].split(", "))    
        }

        dbTempers = dbTempers.flat();
        let temperaments = new Set(dbTempers);
        dbTempers = Array.from(temperaments);

        let allTempers = [];

        for (let i = 0; i < dbTempers.length; i++) {
            allTempers.push({temper_name: dbTempers[i]});
        }


        return res.status(200).json(allTempers);
        } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

// const fillDbTempers = async () => {
//     try {
//       await Temper.bulkCreate(dbTempers);
//       console.log("Temperamentos cargados");
//     } catch (error) {
//       console.error(error)
//     }
    
    
//     };

// const getAllTempers = async(req, res) => {
//     try{

//         let response = Temper.findAll();

//         if(response.length === 0) {
//             return res.status(400).json({message: "No tempers where found"});
//         }

//         return res.status(200).json(response);
//     } catch(error) {
//         return res.status(500).json({message: error.message});
//     }
// }


module.exports = {
    storeTempers,
    //getAllTempers,
    //fillDbTempers,
}