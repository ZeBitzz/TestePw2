const Router=require("express").Router;
const ReservaControllers=require("../controllers/reserva.controller")
var router=Router();

router.get("/reservas/allRestauranteReservas/:id_restaurante", ReservaControllers.getAllRestauranteReservas);
router.get("/reservas/allUtilizadorReservas/:id_utilizador", ReservaControllers.getAllUtilizadorReservas);
router.post("/reservas", ReservaControllers.post);
router.put("/reservas/restaurantes/:id_restaurante/utilizadores/:id_utilizador/mesas/:id_mesa", ReservaControllers.put)
router.delete("/reservas/restaurantes/:id_restaurante/utilizadores/:id_utilizador/mesas/:id_mesa", ReservaControllers.delete);
router.get("/reservas/nonAvailableTablesIds/:id_restaurante", ReservaControllers.getNonAvailabeTablesIds);

module.exports=router;