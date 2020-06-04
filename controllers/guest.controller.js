const Database = require("../database/database");


exports.post = (req, res, next) => {
    createGuest(req.params.id_conference, req.body.email).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteGuest(req.params.id_conference, req.params.id_guest).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function createGuest(id_conference, email){ //Adicionar convidados a uma determinada conferencia
    email = Database.escape(email);
    id_guest = getUserIdByEmail(email)

    const sql = `INSERT INTO guest (id_conference, id_guest) VALUES (?,?);`
    return Database.query(sql, [id_conference, id_guest]).then(suc=>{
        if (suc !== undefined){
            return "Convidado Adicionada com Sucesso"
        }
        else{return `Erro: ` + suc}
    });
}

function getUserIdByEmail(email){
    const sql = `Select id_user FROM user WHERE email = ?`//Descobrir id do convidado a partir do email
    return Database.query(sql, [email]).then(suc=>{
        return suc
    }) 
}

function deleteGuest(id_conference, id_guest){

    const sql = "DELETE FROM guest WHERE id_conference = ? AND id_guest = ?;"
    return Database.query(sql, [id_conference, id_guest]).then(res=>{
        if (res.affectedRows > 0){
            return "Convidado Removido com Sucesso";
        }
        else{
            return "Convidado Não Existente";
        }
    })
}
