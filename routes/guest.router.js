const Router=require("express").Router;
const GuestControllers=require("../controllers/guest.controller")
var router=Router();

router.post("/conferences/:id_conference/guests", GuestControllers.post);
router.delete("/conferences/:id_conference/guests/:id_guest", GuestControllers.delete);

module.exports=router;