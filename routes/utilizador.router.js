const Router=require("express").Router;
const UtilizadorController=require("../controllers/utilizador.controller")
var router=Router();

router.get("/utilizadores", UtilizadorController.get);
router.post("/utilizadores", UtilizadorController.post);
router.put("/utilizadores/:id_utilizador", UtilizadorController.put);
router.delete("/utilizadores/:id_utilizador", UtilizadorController.delete);

module.exports=router;

//email, username, password, adress, postal-code, locality ---------------- Restaurante
//email, username, password ---------------------- Cliente
