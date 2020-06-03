const Database=require("../database/database");
const bcrypt=require("bcrypt");
const Codigopostal=require("./codigopostal.controller")

const SALT_ROUNDS = 10;

exports.get = (req, res, next) => {
    login(req.body.email, req.body.password).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.post = (req, res, next) => {
    console.log(req.body);
    create(req.body.nome, req.body.password, req.body.morada, req.body.cod_postal, req.body.localidade, req.body.email).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.put = (req, res, next) => {
    update(req.params.id_restaurante, req.body.foto_perfil, req.body.informacao, req.body.disponibilidade, req.body.aprovacao).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

exports.delete = (req, res, next) => {
    deleteRestaurante(req.params.id_restaurante).then(result=>{
        res.json(result);
    }).catch(err=>res.json(err));
}

function create(nome, password, morada, cod_postal, localidade, email){
    const cod_postalSave=cod_postal;
    nome=Database.escape(nome);
    password=bcrypt.hashSync(Database.escape(password),SALT_ROUNDS);
    morada=Database.escape(morada)
    cod_postal=Database.escape(cod_postal)
    email=Database.escape(email);
    const sql = `INSERT INTO restaurante (nome, password, foto_perfil, informacao, morada, aprovacao, cod_postal, disponibilidade, email) VALUES (?,?,?,?,?,?,?,?,?);`
    return existsWithEmail(email).then(exists=>{ //verificar se existe utilizador para esse email
        if(exists===false){//se o user com o email nao existir criar conta
            return Database.query(sql,[nome, password, "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png", "Adicionar Informações Relevantes", morada, false, cod_postal, true, email])
            .then(suc=>{
                if (suc !== undefined){
                    return Codigopostal.create(cod_postalSave, localidade).then(created=>{
                        if(created===true){
                            return "Conta criada com Sucesso | Código Postal criado com Sucesso"
                        }
                        else{return "Conta criada com Sucesso | Código Postal já Existente"}
                    })

                }
            });
        }else{ // nao cria conta
            return "Conta já Existente";
        }
    });
}   

function existsWithEmail(email){
    const sql = "SELECT * FROM restaurante WHERE email = ?";
    return Database.query(sql, [email]).then(res=>{
        return res.length>0 || res.length===undefined;
    });
}

function login(email, password){
    email=Database.escape(email);
    password=Database.escape(password);

    const sql = "SELECT * FROM restaurante WHERE email = ?";
    return Database.query(sql, [email]).then(res=>{
        const user=res[0];
        if(user){
            if(bcrypt.compareSync(password, user.password)){//comparar pass encryptada com a escrita pelo utilizador
                return user;//true if credentials match
            }else{
                return undefined;//false if credentials no match
            };
        }else{
            console.error("CANT FIND RESTAURANT FOR THAT EMAIL & PASS");
            return undefined;
        }
    });
}

function update(id_restaurante, foto_perfil, informacao, disponibilidade, aprovacao){
   
    foto_perfil=Database.escape(foto_perfil);
    informacao=Database.escape(informacao);
    disponibilidade=Database.escape(disponibilidade);
    aprovacao=Database.escape(aprovacao);

    const sql = "UPDATE restaurante SET foto_perfil = ?, informacao = ?, disponibilidade = ?, aprovacao = ? WHERE id_restaurante = ?";
    return Database.query(sql, [foto_perfil, informacao, disponibilidade, aprovacao, id_restaurante]).then(res=>{
        if(res.affectedRows > 0){
            return "Mudanças Salvas"
        }
        else{return "Sem Mudanças"}
    })
}

function deleteRestaurante(id_restaurante){
    

    const sql = "DELETE FROM restaurante WHERE id_restaurante = ?";
    return Database.query(sql, [id_restaurante]).then(res=>{
        if (res.affectedRows > 0){
            return "Restaurante Removido"
        }
        else{return "Restaurante Não Existente"}
    })
}

function getAllRestaurantes(){
    const sql = "SELECT * FROM restaurante";
    return Database.query(sql);
}