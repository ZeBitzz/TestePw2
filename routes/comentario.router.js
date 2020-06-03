const Router=require("express").Router;
const ComentarioControllers=require("../controllers/comentario.controller")
var router=Router();

router.get("/restaurantes/:id_restaurante/comentarios", ComentarioControllers.get);
router.post("/restaurantes/:id_restaurante/comentarios", ComentarioControllers.post);

module.exports=router;