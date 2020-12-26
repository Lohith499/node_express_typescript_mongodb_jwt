import http from 'http';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import authentication from './routes/authentication';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const router = express();

router.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//API Rules

router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X=Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE, PATCH');
        res.status(200).json({});
    }
    next();
});

router.use('/api', authentication);

router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
console.log(config.mongo.url);
mongoose
    .connect(config.mongo.url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
        httpServer.listen(config.server.port, () => {
            logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`);
        });
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
        throw error;
    });
