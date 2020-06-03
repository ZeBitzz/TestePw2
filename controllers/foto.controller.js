//Controller para o album de fotos de um restaurante, é necessário adicionar fotos, remover fotos, e receber todas as fotos de um restaurante (com id) para dar render!
const Database = require("../database/database");


exports.get = (req, res, next) => {
    getRestaurantFotos(req.params.id_restaurante).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    createFoto(req.params.id_restaurante, req.body.link_foto).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteFoto(req.params.id_foto).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function createFoto(id_restaurante, link_foto){ //Adicionar fotos a um determinado restaurante
    link_foto=Database.escape(link_foto);

    const sql = `INSERT INTO foto (id_restaurante, link_foto) VALUES (?,?);`
    return Database.query(sql, [id_restaurante, link_foto]).then(suc=>{
        if (suc !== undefined){
            return "Foto Adicionada com Sucesso"
        }
        else{return `Erro: ` + suc}
    });
}

function getRestaurantFotos(id_restaurante){ //Receber todas as fotos de um determinado restaurante

    const sql = "SELECT * FROM foto WHERE id_restaurante = ?";
    return Database.query(sql, [id_restaurante]).then(res=>{
        return res
    })
}

function deleteFoto(id_foto){

    const sql = "DELETE FROM foto WHERE id_foto = ?;"
    return Database.query(sql, [id_foto]).then(res=>{
        if (res.affectedRows > 0){
            return "Foto Removida com Sucesso";
        }
        else{
            return "Foto Não Existente";
        }
    })
}
