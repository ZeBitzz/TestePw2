const Router=require("express").Router;
const ConferenceControllers=require("../controllers/conference.controller")
var router=Router();

router.get("/conferences/allUserConferences/:id_user", ConferenceControllers.getAllUserConferences);
router.get("/conferences/allUserInvites/:id_user", ConferenceControllers.getAllUserInvites);
router.post("/conferences", ConferenceControllers.post);
router.delete("/conferences/:id_conference", ConferenceControllers.delete);

module.exports=router;