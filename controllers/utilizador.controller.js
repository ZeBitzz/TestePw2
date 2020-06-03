const Database=require("../database/database");
const bcrypt=require("bcrypt");

const SALT_ROUNDS = 10;


exports.get = (req, res, next) => {
    login(req.body.email, req.body.password).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    console.log(req.body);
    create(req.body.user_name, req.body.email, req.body.password).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.put = (req, res, next) => {
    update(req.params.id_utilizador, req.body.user_name, req.body.email, req.body.foto, req.body.numero_tel).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteUtilizador(req.params.id_utilizador).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function create(user_name, email, password){
    user_name=Database.escape(user_name);
    email=Database.escape(email);
    password=bcrypt.hashSync(Database.escape(password),SALT_ROUNDS);
    const sql = "INSERT INTO utilizador (user_name, email, password, administrador, foto) VALUES (?,?,?,?,?);";
    return existsWithEmail(email).then(exists=>{ //verificar se existe utilizador para esse email
        if(exists===false){//se o user com o email nao existir criar conta
            return Database.query(sql,[user_name, email, password, false, "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"]);
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

function login(email, password){
    email=Database.escape(email);
    password=Database.escape(password);

    const sql = "SELECT * FROM utilizador WHERE email = ?";
    return Database.query(sql, [email]).then(res=>{
        const user=res[0];
        if(user){
            if(bcrypt.compareSync(password, user.password)){//comparar pass encryptada com a escrita pelo utilizador
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

function update(id_utilizador, user_name, email, foto, numero_tel){
    
    user_name=Database.escape(user_name);
    email=Database.escape(email);
    foto=Database.escape(foto);
    numero_tel=Database.escape(numero_tel);
    
    if (numero_tel == "NULL") numero_tel = undefined

    const sql = "UPDATE utilizador SET user_name = ?, email = ?, foto = ?, numero_tel = ? WHERE id_utilizador = ?";
    return Database.query(sql, [user_name, email, foto, numero_tel, id_utilizador]).then(res=>{
        if(res.affectedRows > 0){
            return "Mudanças Salvas"
        }
        else{return "Sem Mudanças"}
    })
}

function deleteUtilizador(id_utilizador){
    

    const sql = "DELETE FROM utilizador WHERE id_utilizador = ?";
    return Database.query(sql, [id_utilizador]).then(res=>{
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


//email, username, password, adress, postal-code, locality ---------------- Restaurante
//email, username, password ---------------------- Cliente