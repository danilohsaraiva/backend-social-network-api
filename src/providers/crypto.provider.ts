import bcrypt from "bcrypt";
import { HashProvider } from "../interfaces/crypto/hash-provider.interface";

export class CryptoProvider implements HashProvider {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}