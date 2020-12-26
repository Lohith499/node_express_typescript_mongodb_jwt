import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logging from '../config/logging';
import config from '../config/config';

const NAMESPACE = 'JWT Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (err, decoded) => {
            if (err) {
                return res.status(404).json({
                    message: err.message,
                    err
                });
            } else {
                res.locals.jwt = decoded;
                logging.info(NAMESPACE, `message : ${JSON.stringify(decoded)}`);
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

export default extractJWT;
