const Router=require("express").Router;
const UserController=require("../controllers/user.controller")
var router=Router();

router.get("/users", UserController.get);
router.post("/users", UserController.post);
router.put("/users/:id_user", UserController.put);
router.delete("/users/:id_user", UserController.delete);

module.exports=router;
