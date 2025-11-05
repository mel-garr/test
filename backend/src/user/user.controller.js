const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

async function getUserById(req, res) {
    try{
        const { id } = req.params;
        const user = await prisma.user.findUnique ({
            where: {  id: parseInt(id) },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

async function deleteUser(req, res) {
    try{
        const { id } = req.params;
        await prisma.user.delete ({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "User deleted successfully " });
    } catch(error){
        res.status(400).json({ message: error.message });
    }
}


// user own profille data

async function me(req, res) {
    try {
        const { id } = req.user;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateme(req, res) {
    try {
        const { id } = req.user;
        const { name, email } = req.body;
        if (!name && !email) {
            return res.status(400).json({ message: "Nothing to update" });
            }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { 
                ...(name && { name }),
                ...(email && { email }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        res.status(200).json(updatedUser);
    }catch(error){
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Email already in use" });
        }
        res.status(500).json({ message: error.message});
    }
}

async function changepassword(req, res) {
    try{
        const { id } = req.user;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { password: hashedPassword },
        });
        res.status(200).json({ message: "Password changed successfully" });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function deleteme(req, res) {
    try {
        const { id } = req.user;
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    me,
    updateme,
    changepassword,
    deleteme
};
