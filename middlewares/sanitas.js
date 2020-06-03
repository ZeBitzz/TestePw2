const validator=require("express-validator");
const bcrypt=require("bcrypt");
//função sanitize para não deixar o utilizador dar input a código e roubar-nos os segredos
function sanitas(req, res, next) {
    for (var item in req.body) {
        req.sanitize(item).escape();
    }

    next();
}
module.exports.sanitas = sanitas;