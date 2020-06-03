const Router=require("express").Router;
const PratoControllers=require("../controllers/prato.controller")
var router=Router();

router.get("/restaurantes/:id_restaurante/pratos", PratoControllers.get);
router.post("/restaurantes/:id_restaurante/pratos", PratoControllers.post);
router.delete("/restaurantes/pratos/:id_prato", PratoControllers.delete);

module.exports=router;

