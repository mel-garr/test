const { PrismaClient } = require('@prisma/client');
const { hashpassword, verifyPassword, generateAccessToken, generateRefreshToken } = require('./auth.service');

const prisma = new PrismaClient();

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!email || ! password){
            return res.status(400).json({
                message: 'Email and password required'
            });
        }
        const existingUser = await prisma.user.findUnique({
            where: {  email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User alredy exist'});
        }
        const hashedPassword = await hashpassword(password);
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                password: hashedPassword,
            }
        });
        const accessToken = generateAccessToken(newUser);
        const refreshToken = await generateRefreshToken(newUser);
        
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email },
                accessToken,
                refreshToken
        });
    }catch(error){
        return res.status(500).json({ message: error.message});
    }
    
}

//login daba

async function login( req, res){
    try {
        const { email, password } = req.body;
        if (!email || !password ){
            return res.status(400).json({
                message: "email and password required "
            });
        }
        const user = await prisma.user.findUnique( {
            where: { email }
        });
        if (!user || !user.password ){
            return res.status(400).json({
                message: "invalid credentials"
            });
        }
        const validPassword = await verifyPassword(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                message: "invalid credentials"
            });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken (user);
        res.status(200).json({
            message: "login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            accessToken,
            refreshToken
        });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken){
        return res.status(400).json({ message: "Refresh token is required"});
    }
    try {
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken }
        });
        if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()){
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }
        const accessToken = generateAccessToken({ id: storedToken.userId });
        res.json({ accessToken });
    } catch(error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    signup,
    login,
    refreshToken
};