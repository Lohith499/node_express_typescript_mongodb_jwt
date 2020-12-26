import express, { Request, Response, NextFunction } from 'express';
import authentication from '../controllers/authentication';
import logging from '../config/logging';
import moduleName from 'module';
import extractJWT from '../middleware/extractJWT';

const router = express();

const NAMESPACE = 'Server';

router.get('/test', (req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    res.status(200).json({ status: 'ping successful' });
});

router.get('/validateToken', extractJWT, (req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    authentication.validateToken(req, res, next);
});

router.post('/registration', (req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    authentication.register(req, res, next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    authentication.login(req, res, next);
});

router.get('/getUsers', extractJWT, (req: Request, res: Response, next: NextFunction) => {
    logging.info(`METHOD : [${req.method}] - URL: [${req.url}]  - STATUS: [${res.statusCode}]  - IP: [${req.socket.remoteAddress}]`, NAMESPACE);
    authentication.getUsers(req, res, next);
});

export = router;
