const getUsers = (req,res,db)=>{
    db.select('*').from('users')
    .then(data=>{
        res.json(data)
    })
    .catch(error => res.status(400).json(error))
}

module.exports = {
    getUsers : getUsers
}