const Router=require("express").Router;
const RestauranteControllers=require("../controllers/restaurante.controller")
var router=Router();

router.get("/restaurantes", RestauranteControllers.get);
router.post("/restaurantes", RestauranteControllers.post);
router.put("/restaurantes/:id_restaurante", RestauranteControllers.put);
router.delete("/restaurantes/:id_restaurante", RestauranteControllers.delete);

module.exports=router;

//email, username, password, adress, postal-code, locality ---------------- Restaurante
//email, username, password ---------------------- Cliente
