const Database = require("../database/database");
//obrigado Rui és lindo :)
//o meu PC é uma porcaria
exports.getNonAvailabeTablesIds = (req, res, next) => {
    findNonAvailableTablesIds(req.body.data_hora_reservada, req.params.id_restaurante).then(tableIds => {
        res.json(tableIds)
    }).catch(err => res.json(err));

};

//CREATE
exports.post = (req, res, next) => {
    create(req.body.data_hora_reservada, req.body.id_utilizador, req.body.id_restaurante, req.body.id_mesa,
        req.body.data_hora).then(serverAnswer => {
        console.log(req.body);

        res.json(serverAnswer);
    }).catch(err => res.json(err));
};

//READ
exports.getAllRestauranteReservas = (req, res, next) => {
    getAllRestauranteReservas(req.params.id_restaurante).then(bookingHistory => {
        res.json(bookingHistory)
    }).catch(err => res.json(err));
};

exports.getAllUtilizadorReservas = (req, res, next) => {
    getAllUtilizadorReservas(req.params.id_utilizador).then(bookingHistory => {
        res.json(bookingHistory)
    }).catch(err => res.json(err));
};

//UPDATE
exports.put = (req, res, next) => {
    update(req.body.data_hora_reservada, req.params.id_utilizador, req.params.id_restaurante, req.params.id_mesa, req.body.data_hora, req.body.newConfirmacao, req.body.newPresenca)
        .then(update => {
            res.json(update)
        })
        .catch(err => res.json(err));

};
//DELETE
exports.delete = (req, res, next) => {
    deleteReserva(req.body.data_hora_reservada, req.params.id_utilizador, req.params.id_restaurante, req.params.id_mesa, req.body.data_hora)
        .then(deleteLog => {
            res.json(deleteLog)
        })
        .catch(err => res.json(err));

};


function create(data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora) {
    data_hora_reservada = Database.escape(data_hora_reservada);
    id_utilizador = Database.escape(id_utilizador);
    id_restaurante = Database.escape(id_restaurante);
    id_mesa = Database.escape(id_mesa);
    data_hora = Database.escape(data_hora);
    const sql = "INSERT INTO reserva (data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora, confirmacao, presenca) VALUES (?,?,?,?,?,'p',false);";

    return find(data_hora_reservada, id_restaurante, id_mesa).then(reserva => {
        //verificar se existe reserva confirmada para  
        //mesma data_hora_reservada e mesa

        if (reserva === undefined) { //se uma reserva confirmada nao existir criar pedido
            return Database.query(sql, [data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora]);
        } else { // nao cria pedido
            return "Error! This table is unavailable you should not be able to book it.";
        }
    });
}

function update(data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora, newConfirmacao, newPresenca) {
    data_hora_reservada = Database.escape(data_hora_reservada);
    data_hora = Database.escape(data_hora)

    const sql = "UPDATE reserva SET confirmacao = ?, presenca = ? WHERE data_hora_reservada = ? AND id_utilizador = ? AND id_restaurante = ? AND id_mesa = ? AND data_hora = ?";

    return Database.query(sql, [newConfirmacao, newPresenca, data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora]);

}

function deleteReserva(data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora) {
    data_hora_reservada = Database.escape(data_hora_reservada)
    data_hora = Database.escape(data_hora);

    const sql = "DELETE FROM reserva WHERE data_hora_reservada = ? AND id_utilizador = ? AND id_restaurante = ? AND id_mesa = ? AND data_hora = ?;";

    return Database.query(sql, [data_hora_reservada, id_utilizador, id_restaurante, id_mesa, data_hora]);
}


function find(data_hora_reservada, id_restaurante, id_mesa) {
    data_hora_reservada = Database.escape(data_hora_reservada);
    id_restaurante = Database.escape(id_restaurante);
    id_mesa = Database.escape(id_mesa);

    const sql = "SELECT * FROM reserva WHERE data_hora_reservada = ? AND id_restaurante = ? AND id_mesa = ?";
    return Database.query(sql, [data_hora_reservada, id_restaurante, id_mesa]).then(res => {
        const reserva = res[0];
        return reserva;
    });
}

function getAllRestauranteReservas(id_restaurante) { //receber todas as reservas de um determinado restaurante para dar render
    const sql = `SELECT reserva.data_hora_reservada, reserva.id_utilizador, reserva.id_restaurante, reserva.id_mesa, 
    reserva.data_hora, reserva.confirmacao, reserva.presenca, utilizador.user_name, mesa.n_cadeiras  
    FROM ((reserva
    INNER JOIN mesa ON reserva.id_restaurante = mesa.id_restaurante)
    INNER JOIN utilizador ON reserva.id_utilizador = utilizador.id_utilizador)
    WHERE reserva.id_restaurante = ?`;
    return Database.query(sql, [id_restaurante]);

    //um bocado random mas isto agora está cada row duas vezes e não sei porquê
}

function getAllUtilizadorReservas(id_utilizador) { //receber todas as reservas de um determinado utilizador para dar render
    console.log(id_utilizador)
    const sql = `SELECT reserva.data_hora_reservada, reserva.id_utilizador, reserva.id_restaurante, reserva.id_mesa, 
    reserva.data_hora, reserva.confirmacao, reserva.presenca, restaurante.nome, mesa.n_cadeiras  
    FROM ((reserva
    INNER JOIN mesa ON reserva.id_restaurante = mesa.id_restaurante)
    INNER JOIN restaurante ON reserva.id_restaurante = restaurante.id_restaurante)
    WHERE reserva.id_utilizador = ?`;
    return Database.query(sql, [id_utilizador]);

    //esta também dá cada row duas vezes idk man
}

function findNonAvailableTablesIds(data_hora_reservada, id_restaurante) {
    //se a data_hora_reservada for igual E id_restaurante igual E a reserva está confirmada, o id_mesa dessa
    //reserva está ocupado
    data_hora_reservada = Database.escape(data_hora_reservada);

    const sql = 'SELECT id_mesa FROM reserva WHERE data_hora_reservada = ? AND id_restaurante = ? AND confirmacao = "c"';
    return Database.query(sql, [data_hora_reservada, id_restaurante]).then(res => {
        const nonAvailableTables = res;
        return nonAvailableTables;
    });
}