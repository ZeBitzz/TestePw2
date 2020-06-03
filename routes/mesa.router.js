const Router=require("express").Router;
const MesaControllers=require("../controllers/mesa.controller")
var router=Router();

router.get("/restaurantes/:id_restaurante/mesas", MesaControllers.get);
router.post("/restaurantes/:id_restaurante/mesas", MesaControllers.post);
router.delete("/restaurantes/mesas/:id_mesa", MesaControllers.delete);

module.exports=router;

