import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const secretPW = async(password) => {
    const salts = await bcrypt.genSalt(8);
    return bcrypt.hash(password, salts);
};

export const validatePW = async(password, user) => {
    return bcrypt.compare(password, user.password)
};

export default __dirname;