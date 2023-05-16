const { Dog, Temper, Op } = require("../db");
const axios = require("axios");
const { API_URL } = process.env

const createDog = async (req, res) => {
        let {
            name, 
            weight, 
            height, 
            life_span, 
            image,
            temper_name,
        } = req.body;

        const dogFound = await Dog.findOne({where: { name }});

        if(dogFound) {
            return res.status(500).json({message: `Dog with name ${name} already exists`});
        }


        if(!name || !weight || !height || !life_span || !image || !temper_name) {
            return res.status(500).json({message: "There is missing information"});
        }

        const temperDog = await Temper.findOne({where: { temper_name }});

          if (!temperDog) {
            return res.status(404).json({ message: "Selected temper does not exist" });
          }

          
    try {
        let dogCreated = await Dog.create({
            name,
            weight,
            height,
            life_span,
            image,
        })

        await dogCreated.addTempers(temperDog);


        return res.status(201).json({ message: `${name} has been created successfuly`});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};



const getAllDogs = async (req, res) => {
    try{
        let dbDogs = await Dog.findAll({include: {model: Temper}});
        let apiDogs = await axios.get(API_URL);
        let allDogs = [...dbDogs, ...apiDogs.data];

        if(allDogs.length === 0) {
            return res.status(404).json({message: "No dogs where found"});
        }

        return res.status(200).json(allDogs);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
    
};


const getDogByName = async (req, res) => {
    try {
        let {name} = req.query;

        let dbDogs = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
            include: {model: Temper}
        });

        let apiDogs = await axios.get(API_URL);
        let apiFiltered = await apiDogs.data.filter(dog => dog.name.toLowerCase() === name.toLowerCase());

        let allDogs = [...dbDogs, ...apiFiltered];
            
        if(allDogs.length === 0) {
            return res.status(404).json({message: `No dogs with name ${name} where found`});
        }

        return res.status(200).json(allDogs);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

const getDogById = async (req, res) => {
    try {
        const { id } = req.params;

        if(id.length > 10) {
        let dbDogs = await Dog.findByPk(id, {include: {model: Temper}});
        if(dbDogs.length === 0) {
            return res.status(404).json({message: `Dog with id ${id} not found`});
          }
            return res.status(200).json(dbDogs);
        } else {
        let apiDogs = await axios.get(API_URL);
        let apiFiltered = await apiDogs.data.filter(dog => dog.id.toString() === id.toString());

            if(apiFiltered.length === 0) {
                return res.status(404).json({message: `Dog with id ${id} not found`});
            };

            return res.status(200).json(apiFiltered);
        }

         
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    createDog,
    getAllDogs,
    getDogByName,
    getDogById,
}

