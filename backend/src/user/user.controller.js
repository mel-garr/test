async function getUsers(req, res) {
    res.json({message: "getuser si workings!"});
}

async function getUserById(req, res) {
    const { id } = req.params;
    res.json({message: `get user by id ${id} is working!`});
}

module.exports = {
    getUsers,
    getUserById
};
