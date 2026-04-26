import { sign, verify } from 'jsonwebtoken';
import { getJwtOptions } from '../config/jwt.config';

interface JwtUserPayload {
    userId: string;
}
export class JwtService {
    //header. payload. signature
    public createToken(data: JwtUserPayload) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET missing');
        }

        const token = sign(
            data,
            secret,
            getJwtOptions(),
        );

        return token;
    }

    public verifyToken(token: string): JwtUserPayload {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET missing');
        }

        return verify(token, secret) as JwtUserPayload;
    }
}
