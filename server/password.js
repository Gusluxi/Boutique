import bcrypt from "bcrypt";

export async function loginRouter(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export async function signupRouter(newPlainPassword, saltRounds) {
    return await bcrypt.hash(newPlainPassword, saltRounds);
};

