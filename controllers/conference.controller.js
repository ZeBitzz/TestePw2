const Database = require("../database/database");

//CREATE
exports.post = (req, res, next) => {
    create(req.body.date_time_start, req.body.id_host, req.body.date_time, req.body.name,
        req.body.description).then(serverAnswer => {

        console.log(req.body);

        res.json(serverAnswer);
    }).catch(err => res.json(err));
};

//READ
exports.getAllUserConferences = (req, res, next) => {
    getAllUserConferences(req.params.id_user).then(conference => {
        res.json(conference)
    }).catch(err => res.json(err));
};

exports.getAllUserInvites = (req, res, next) => {
    getAllUserInvites(req.params.id_user).then(guest => {
        res.json(guest)
    }).catch(err => res.json(err));
};


//DELETE
exports.delete = (req, res, next) => {
    deleteReserva(req.params.id_conference)
        .then(deleteLog => {
            res.json(deleteLog)
        })
        .catch(err => res.json(err));

};


function create(date_time_start, id_host, date_time, name, description) {
    date_time_start = Database.escape(date_time_start);
    id_host = Database.escape(id_host);
    name = Database.escape(name);
    description = Database.escape(description);
    date_time = Database.escape(date_time);
    const sql = "INSERT INTO conference (date_time_start, id_host, name, description, date_time) VALUES (?,?,?,?,?);";

    Database.query(sql, [date_time_start, id_host, name, description, date_time]);
    
}



function deleteReserva(id_conference) {
    const sql = "DELETE FROM conference WHERE id_conference = ?;";

    return Database.query(sql, [id_conference]);
}


function getAllUserConferences(id_user) { //receber todas as confs criadas pelo utilizador, para dar render no site
    const sql = `SELECT *  
    FROM conference 
    WHERE conference.id_host = ?`;
    return Database.query(sql, [id_user]);
}

function getAllUserInvites(id_user) { //receber todas as confs que o utilizador foi convidado, para dar render
    console.log(id_utilizador)
    const sql = `SELECT conference.id_conference, conference.data_time_start, conference.id_host, 
    conference.date_time, conference.name, conference.description
    FROM conference
    INNER JOIN guest
    ON conference.id_conference = guest.id_conference
    WHERE guest.id_guest = ?`;
    return Database.query(sql, [id_user]);
}