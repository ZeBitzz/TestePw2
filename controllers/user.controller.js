const Database=require("../database/database");
const bcrypt=require("bcrypt");

const SALT_ROUNDS = 10;


exports.get = (req, res, next) => {
    login(req.body.email, req.body.user_password).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    console.log(req.body);
    create(req.body.username, req.body.email, req.body.user_password).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.put = (req, res, next) => {
    update(req.params.id_user, req.body.username, req.body.email, req.body.foto, req.body.numero_tel).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteUtilizador(req.params.id_user).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function create(username, email, user_password){
    username=Database.escape(username);
    email=Database.escape(email);
    user_password=bcrypt.hashSync(Database.escape(user_password),SALT_ROUNDS);
    const sql = "INSERT INTO utilizador (username, email, user_password, foto) VALUES (?,?,?,?);";
    return existsWithEmail(email).then(exists=>{ //verificar se existe utilizador para esse email
        if(exists===false){//se o user com o email nao existir criar conta
            return Database.query(sql,[username, email, user_password, false, "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"]);
        }else{ // nao cria conta
            return "Conta já Existente";
        }
    });
}   

function existsWithEmail(email){
    const sql = "SELECT * FROM utilizador WHERE email = ?";
    return Database.query(sql, [email]).then(res=>{
        return res.length>0 || res.length===undefined;
    });
}

function login(email, user_password){
    email=Database.escape(email);
    user_password=Database.escape(user_password);

    const sql = "SELECT * FROM utilizador WHERE email = ?";
    return Database.query(sql, [email]).then(res=>{
        const user=res[0];
        if(user){
            if(bcrypt.compareSync(user_password, user.user_password)){//comparar pass encryptada com a escrita pelo utilizador
                return user;//true if credentials match
            }else{
                return undefined;//false if credentials no match
            };
        }else{
            console.error("CANT FIND USER FOR THAT EMAIL & PASS");
            return undefined;
        }
    });
}

function update(id_user, username, email, foto){
    
    username=Database.escape(username);
    email=Database.escape(email);
    foto=Database.escape(foto);
    
    
    const sql = "UPDATE utilizador SET username = ?, email = ?, foto = ? WHERE id_user = ?";
    return Database.query(sql, [username, email, foto, id_user]).then(res=>{
        if(res.affectedRows > 0){
            return "Mudanças Salvas"
        }
        else{return "Sem Mudanças"}
    })
}

function deleteUtilizador(id_user){
    

    const sql = "DELETE FROM utilizador WHERE id_user = ?";
    return Database.query(sql, [id_user]).then(res=>{
        if (res.affectedRows > 0){
            return "Utilizador Removido"
        }
        else{return "Utilizador Não Existente"}
    })
}


function getAllUtilizadores(){
    const sql = "SELECT * FROM utilizador";
    return Database.query(sql);
}


//email, username, user_password, adress, postal-code, locality ---------------- Restaurante
//email, username, user_password ---------------------- Cliente