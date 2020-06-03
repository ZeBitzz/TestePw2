//Controller para o menu de um restaurante, é necessário adicionar pratos, remover pratos, e receber todos os pratos de um restaurante (com id) para dar render!
//É prreciso também ir buscar a descrição da categoria dos pratos à table "categoria"
const Database = require("../database/database");


exports.get = (req, res, next) => {
    getRestaurantPratos(req.params.id_restaurante).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    createPrato(req.params.id_restaurante, req.body.preco, req.body.desc_prato, req.body.id_categoria).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deletePrato(req.params.id_prato).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function createPrato(id_restaurante, preco, desc_prato, id_categoria){ //Adicionar pratos a um determinado restaurante
    
    preco=Database.escape(preco);
    desc_prato=Database.escape(desc_prato);
    id_categoria=Database.escape(id_categoria)

    const sql = `INSERT INTO prato (id_restaurante, preco, desc_prato, id_categoria) VALUES (?,?,?,?);`
    return Database.query(sql, [id_restaurante, preco, desc_prato, id_categoria]).then(suc=>{
        if (suc !== undefined){
            return "Prato Adicionado com Sucesso"
        }
        else{return `Erro: ` + suc}
    });
}

function getRestaurantPratos(id_restaurante){ //Receber todas os pratos de um determinado restaurante

    const sql = "SELECT prato.id_prato, prato.desc_prato, prato.preco, categoria.desc_categoria FROM prato INNER JOIN categoria ON prato.id_categoria=categoria.id_categoria WHERE prato.id_restaurante = ?";
    return Database.query(sql, [id_restaurante]).then(res=>{
        return res
    })
}

function deletePrato(id_prato){

    const sql = "DELETE FROM prato WHERE id_prato = ?;"
    return Database.query(sql, [id_prato]).then(res=>{
        if (res.affectedRows > 0){
            return "Prato Removido com Sucesso";
        }
        else{
            return "Prato Não Existente";
        }
    })
}

