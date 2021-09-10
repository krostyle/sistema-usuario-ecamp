const express = require('express');
const cors = require('cors');
const db = require('../db/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;
        this.path = '/'

        //MIDDLEWARE
        this.middleware();

        //ROUTES
        this.routes();


    }

    middleware() {

        //CORS
        this.app.use(cors());
        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json());
        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path, require('../routes/usuarios.routes'));

    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`'Server is running on: http://localhost:${this.port}/`);
        });
    }


}


module.exports = Server;