const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashpassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateAccessToken(user) {
    return  jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
}

async function generateRefreshToken(user) {
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d'}
    );

    await prisma.refreshToken.create({
        data: {
            token,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });

    return token;
}

module.exports = {
    hashpassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken
};
