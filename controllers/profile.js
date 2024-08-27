const handleProfile = (req,res,db) => {
    const ID = req.params.id; 
    db.select('*').from('users').where({
        id:ID
    })
    .then(user=>{
        if(user.length){
            res.json(user[0]);
        }else{
            res.status(500).json('User not found');
        }      
    })
    .catch(error => res.status(404).json(error))
}

module.exports = {
    handleProfile : handleProfile
}