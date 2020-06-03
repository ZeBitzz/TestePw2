//Controller para gerir mesas de um restaurante, é necessário adicionar mesas, remover mesas e receber todas as mesas de um restaurante (com id) para dar render!
const Database = require("../database/database");


exports.get = (req, res, next) => {
    getRestaurantMesas(req.params.id_restaurante).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    createMesa(req.params.id_restaurante, req.body.n_cadeiras).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteMesa(req.params.id_mesa).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function createMesa(id_restaurante, n_cadeiras){ //Adicionar mesas a um determinado restaurante
    n_cadeiras=Database.escape(n_cadeiras);

    const sql = `INSERT INTO mesa (id_restaurante, n_cadeiras) VALUES (?,?);`
    return Database.query(sql, [id_restaurante, n_cadeiras]).then(suc=>{
        if (suc !== undefined){
            return "Mesa Adicionada com Sucesso"
        }
        else{return `Erro: ` + suc}
    });
}

function getRestaurantMesas(id_restaurante){ //Receber todas as mesas de um determinado restaurante

    const sql = "SELECT * FROM mesa WHERE id_restaurante = ?";
    return Database.query(sql, [id_restaurante]).then(res=>{
        return res
    })
}

function deleteMesa(id_mesa){

    const sql = "DELETE FROM mesa WHERE id_mesa = ?;"
    return Database.query(sql, [id_mesa]).then(res=>{
        if (res.affectedRows > 0){
            return "Mesa Removida com Sucesso";
        }
        else{
            return "Mesa Não Existente";
        }
    })
}
