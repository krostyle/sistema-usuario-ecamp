//TRUCAZO
const { response, request } = require('express')
const db = require('../db/config')


//HTTP METHODS
const getUsuarios = async(req = request, res = response) => {
    try {
        const text = 'SELECT * FROM usuarios';
        // const values = [];
        const objQuery = {
            name: 'get-usuarios',
            text,
            // values,
            // rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        res.json(rows)
    } catch (error) {
        console.log(error);
        return error;
    }

}

const createUsuario = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const text = 'INSERT INTO usuarios (email, password) VALUES($1, $2) RETURNING *;'
        const values = [email, password];
        const objQuery = {
            text,
            values,
            rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        res.json({
                msg: 'Cancion creada correctamente',
                data: rows[0]
            })
            .status(201)

    } catch (error) {
        console.log(error);
    }
}

// const updateUsuario = async(req = request, res = response) => {
//     try {
//         const { id, cancion, artista, tono } = req.body;
//         const text = 'UPDATE usuarios SET cancion=$2, artista=$3, tono=$4 WHERE id=$1 RETURNING *;'
//         const values = [id, cancion, artista, tono];
//         const objQuery = {
//             text,
//             values,
//             rowMode: 'array'
//         };
//         const { rows } = await db.query(objQuery);
//         console.log(rows);
//         res.json({
//             msg: 'Canción actualizada correctamente',
//             data: rows[0]
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }



// const deleteUsuario = async(req = request, res = response) => {
//     try {
//         const { id } = req.query;
//         const text = 'DELETE FROM repertorio WHERE id = $1 RETURNING *;'
//         const values = [id];
//         const objQuery = {
//             text,
//             values,
//             rowMode: 'array'
//         };
//         const { rows } = await db.query(objQuery);
//         res.json({
//             msg: 'Ejercicio eliminado correctamente',
//             data: rows[0]
//         })
//     } catch (error) {
//         console.log(error);
//     }

// }


const login = async(req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const text = 'SELECT * FROM usuarios WHERE email = $1 AND password = $2;'
        const values = [email, password];
        const objQuery = {
            text,
            values,
            rowMode: 'array'
        };
        const { rows } = await db.query(objQuery);
        if (rows[0]) {
            res.json({
                msg: 'Usuario encontrado',
                data: rows[0]
            })
        } else {
            res.status(401).json({
                msg: 'Usuario no encontrado'
            })
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUsuarios,
    createUsuario,
    login,
    // updateUsuario,
    // deleteUsuario
}