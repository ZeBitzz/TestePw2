const Database = require("../database/database");


exports.post = (req, res, next) => {
    createGuest(req.params.id_conference, req.params.id_guest).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteGuest(req.params.id_conference, req.params.id_guest).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function createGuest(id_conference, id_guest){ //Adicionar convidados a uma determinada conferencia
  
    const sql = `INSERT INTO guest (id_conference, id_guest) VALUES (?,?);`
    return Database.query(sql, [id_conference, id_guest]).then(suc=>{
        if (suc !== undefined){
            return "Convidado Adicionada com Sucesso"
        }
        else{return `Erro: ` + suc}
    });
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
