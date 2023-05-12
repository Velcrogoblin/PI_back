const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require("./dogRoutes");
const temperRoutes = require("./temperRoutes");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router
.use("/dogs", dogRoutes)
.use("/tempers", temperRoutes)


module.exports = router;
