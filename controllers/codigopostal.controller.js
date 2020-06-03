const Database = require("../database/database");

function create(cod_postal, localidade) {
    cod_postal = Database.escape(cod_postal);
    localidade = Database.escape(localidade);
    const sql = `INSERT INTO codigo_postal (cod_postal, localidade) VALUES (?,?)`;
    return existsCod_postal(cod_postal).then(exists=>{ //verificar se  código postal já está na base de dados
        if(exists===false){ //se o cógdigo postal não existir criar
            return Database.query(sql, [cod_postal, localidade]).then(suc=>{
                return true
            })
        }
        else{
            return false
        }
    })
    
}

function existsCod_postal(cod_postal) {
    const sql = "SELECT * FROM codigo_postal WHERE cod_postal = ?";
    return Database.query(sql, [cod_postal]).then(res => {
        return res.length > 0 || res.length === undefined;
    });
}

module.exports.create = create;