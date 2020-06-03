//Controller para os comentários de um restaurante, é preciso dar render a comentarios (ir buscar o nome do utilizador à table "utilizador")
// é preciso também criar comentarios (é necessário ver se o utilizador foi alguma vez ao restaurante)
const Database = require("../database/database");


exports.get = (req, res, next) => {
    getRestaurantComentarios(req.params.id_restaurante).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    createComentario(req.params.id_restaurante, req.body.id_utilizador, req.body.txt_comentario, req.body.rating, req.body.data).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}


function createComentario(id_restaurante, id_utilizador, txt_comentario, rating, data){ //Adicionar comentarios a um determinado restaurante (é preciso ver se o utilizador já foi ao restaurante)
    id_utilizador=Database.escape(id_utilizador);
    txt_comentario=Database.escape(txt_comentario);
    rating=Database.escape(rating);
    data=Database.escape(data);

    return existsReserva(id_utilizador, id_restaurante).then(res => {
        if (res==true){
            const sql="INSERT INTO comentario (id_restaurante, id_utilizador, txt_comentario, rating, data) VALUES (?,?,?,?,?);"
            return Database.query(sql, [id_restaurante, id_utilizador, txt_comentario, rating, data]).then(suc=>{
                return "Comentario Adicionado com Sucesso"
            })
        }
        else{
            return "Não tem Permição para Comentar neste Restaurante"
        }
    })
}

function existsReserva(id_utilizador, id_restaurante){ //verificar se o utilizador tem reserva no restaurante e esteved presente
    
    const sql="SELECT * FROM reserva where id_utilizador = ? AND id_restaurante = ? AND presenca = 1";
    return Database.query(sql, [id_utilizador, id_restaurante]).then(res => {
        return res.length > 0 || res.length === undefined;
    });
}

function getRestaurantComentarios(id_restaurante){ //Receber todoss os comentarios de um determinado restaurante (com o nome do utilizador)

    const sql = `SELECT comentario.txt_comentario, comentario.rating, comentario.data, utilizador.user_name
    FROM comentario INNER JOIN utilizador ON comentario.id_utilizador=utilizador.id_utilizador WHERE comentario.id_restaurante = ?`;
    return Database.query(sql, [id_restaurante]).then(res=>{
        return res
    })
}


