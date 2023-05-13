const { Dog, Op } = require("../db");


const createDog = async (req, res) => {
    try {
        const {name, weight, height, life_span, image} = req.body;

        const dogFound = await Dog.findOne({where: {name}});

        if(dogFound) {
            return res.status(500).json({message: `Dog with name ${name} already exists`});
        }


        if(!name || !weight || !height || !life_span || !image) {
            return res.status(500).json({message: "There is missing information"});
        }



        let dogCreated = await Dog.create({
            name,
            weight,
            height,
            life_span,
            image,
        })

        return res.status(201).json({ message: `${name} has been created successfuly`});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAllDogs = async (req, res) => {
    try{
        let response = await Dog.findAll();
        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
    
};






const getDogByName = async (req, res) => {
    try {
        let {name} = req.query;
        let response = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
        });

        if(response.length === 0) {
            return res.status(400).json({message: `No dogs with name ${name} where found`});
        }

        return res.status(200).json(response);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

const getDogById = async (req, res) => {
    try {
        const { id } = req.params;

        let response = await Dog.findByPk(id);

        if(response.length === 0) {
            return res.status(400).json({message: `Dog with id ${id} not found`});
        }

        return res.status(200).json(response);
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

