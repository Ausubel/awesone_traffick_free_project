import dotenv from "dotenv";
import express, { Application } from "express";
import ControllerInitializer from "./controllers";
import Encripter from "./utils/encripter";
import Tokenizer from "./utils/tokenizer";

export default class Backend {
    private app: Application;

    constructor() {
        this.app = express();
        this.setup();
    }

    setup() {
        this.setupDotenv();
        Encripter.init();
        Tokenizer.init();
        this.setupRequestWithJson();
        this.setupCors();
        this.setupControllers();
    }

    private setupRequestWithJson() {
        this.app.use(
            express.json({
                limit: "5mb",
            })
        );
    }

    private setupCors() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    private setupControllers() {
        new ControllerInitializer(this.app).init();
    }

    private setupDotenv() {
        dotenv.config();
    }

    start() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server listen on port ${PORT}`);
        });
    }
}
