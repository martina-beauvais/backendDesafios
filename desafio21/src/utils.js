import {fileURLToPath} from 'url';
import { dirname } from 'path';

export const makeID = (length) => {
    let result = '';
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = character.length;
    let counter = 0;
    while (counter < length) {
        result += character.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    };
    return result;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;