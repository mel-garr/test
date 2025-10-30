const express = require('express');
let prisma = null;
try {
    // Try to load the generated Prisma client. If prisma hasn't been generated yet
    // this will throw; we catch and keep `prisma` as null so the server can still start.
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
} catch (err) {
    console.warn('Prisma client not available. DB routes will return errors until you run `npx prisma generate`.');
    console.warn(err && err.message ? err.message : err);
}
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/test", (req, res) =>{
    try {
        res.status(200).json({ message: "API is working" });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

//get all user
app.get("/users", async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

//get user by id
app.get("/users/:id", async(req, res) => {
    try {
        const theuser = await prisma.user.findUnique({
            where: {
            id : Number(req.params.id),
        },
    });
        res.status(200).json(theuser);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//create user
app.post("/users", async(req, res) => {
    try {
        const newuser = await prisma.user.create({
            data: {
                name: String(req.params.name),
                email: String(req.params.email)
            },
        });
        res.status(201).json("user added succefully ", newuser)
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//update user
app.put("/users/:id", async(req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: String(req.params.name),
                email: String(req.params.email)
            },
        });
        res.status(201).json("user updated succesfully ", user)
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

//delete user
app.delete("/user/:id", async(req, res)=> {
    try {
        const user = await prisma.user.delete({
            where: {
                id : Number(req.params.id),
            },
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

const PORT = 4000
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));