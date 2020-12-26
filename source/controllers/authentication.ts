import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/user';
import Customer from '../models/customer';
import signJWT from '../functions/signJWT';
import { use } from '../routes/authentication';
import extractJWT from '../middleware/extractJWT';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token Validated, user authorized');
    return res.status(200).json({
        message: 'Authorized'
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token Registration');
    let { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const user = new User({
            username: username,
            password: hash
        });

        return user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username: username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(500).json({
                    message: 'UnAuthorized'
                });
            }
            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    logging.error(NAMESPACE, error.message, req.body);
                    return res.status(401).json({
                        message: 'UnAuthorized'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (error) {
                            logging.error(NAMESPACE, 'Issue while generating jwt token', req.body);
                            return res.status(401).json({
                                message: 'UnAuthorized',
                                error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Authorized',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((error) => {
            return res.status(401).json({
                message: 'No User found',
                error
            });
        });
};

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    Customer.find()
        .select('-passwprd')
        .exec()
        .then((users) => {
            return res.status(200).json({
                results: users,
                noOfRecords: users.length
            });
        })
        .catch((err) => {
            return res.status(200).json({
                message: err.message,
                err
            });
        });
};

export default { validateToken, register, login, getUsers };
