import bcrypt from 'bcrypt-nodejs';

export const createHash = async(password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
};

export const validatePSW = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};