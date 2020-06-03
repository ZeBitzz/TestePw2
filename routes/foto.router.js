const Router=require("express").Router;
const FotoControllers=require("../controllers/foto.controller")
var router=Router();

router.get("/restaurantes/:id_restaurante/fotos", FotoControllers.get);
router.post("/restaurantes/:id_restaurante/fotos", FotoControllers.post);
router.delete("/restaurantes/fotos/:id_foto", FotoControllers.delete);

module.exports=router;