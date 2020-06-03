const fs = require("fs");
const path = require("path");
const Database=require("../database");
const dbConfig = require("../db-config.json");   //Importar configuração da base de dados

//#############//############# VARIAVEIS ESTATICAS #############//#############
const DATABASE_CODE_PATH = path.resolve("./database/databaseCode.sql");
const DATABASE_TEMPLATE_STRING="DATABASE_NAME";
const DATABASE_INSERTS_PATH = path.resolve("./database/databaseInserts.sql")

//#############//############# HELPFULL FUNCTIONS #############//#############
String.prototype.replaceAll = function (stringToFind, stringToReplace) {
    if (stringToFind === stringToReplace) return this;
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
};

function getAllTablesNames(){
    const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${dbConfig.database}';`;
    return Database.query(sql);
}

function getDatabaseDestroySQL(){
    var sql=`USE ${dbConfig.database};\nSET FOREIGN_KEY_CHECKS = 0;\n`;
    return getAllTablesNames().then(tableNames=>{
        for(var i=0; i<tableNames.length; i++){
            sql+=`DROP TABLE IF EXISTS ${dbConfig.database}.${tableNames[i]["TABLE_NAME"]};\n`
        }
        sql+="SET FOREIGN_KEY_CHECKS = 1;";
        return sql;
    });
}

function getDatabaseCreateSQL(){
    const databaseCodeTemplate=fs.readFileSync(DATABASE_CODE_PATH).toString();
    const databaseCode=databaseCodeTemplate.replaceAll(DATABASE_TEMPLATE_STRING, dbConfig.database);
    return databaseCode;
}

//#############//############# FUNCTIONS #############//#############
function destroyDatabase(){
    return getDatabaseDestroySQL().then(sql=>{
        console.log("Destroying Database");
        return Database.query(sql);
    });
};

function createDatabase(){
    const sql=getDatabaseCreateSQL();
    console.log("Creating Database");
    return Database.query(sql);
};

function fillDatabase(){
    const sql=fs.readFileSync(DATABASE_INSERTS_PATH).toString();
    console.log("Filling Database");
    return Database.query(sql);
};

function restart(){
    return destroyDatabase()    //DESTROY DB
    .then(result1=>{createDatabase();}) //CREATE DB
    .then(result2=>{return fillDatabase();}) //Fill DB
    .then(result3=>{Database.destroy()}); //DESTROY CONNECTION TO DB
}

module.exports.restart=restart;