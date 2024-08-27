const handeRegister = (req,res,db,bcrypt)=>{
    const {name , email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

        db.transaction(trx=>{
            trx.insert({
                hash :hash,
                email : email
            })
            .into('login')
            .returning('email')
            .then(loginEmailArray => {
                const loginEmail = loginEmailArray[0].email;
                return trx('users')
                    .returning('*')
                    .insert({ 
                        name: name,
                        email: loginEmail,
                        joined: new Date()
                    })
                    .then(user =>{
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        }).catch(error =>res.status(404).json(error)) 
}

module.exports = {
    handleRegister : handeRegister
}