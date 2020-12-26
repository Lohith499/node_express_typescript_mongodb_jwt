import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import Iuser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (user: Iuser, callback: (error: Error | null, token: String | null) => void): void => {
    var timeSince = new Date().getTime();
    var expirationTime = timeSince + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logging.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            {
                userrname: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {}
};

export default signJWT;
