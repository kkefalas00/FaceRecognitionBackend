const handleSignIn = (req,res,db,bcrypt)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('incorrect sign in credentials');
    }

    db.select('email','hash').from('login') 
     .where('email', '=', email)
     .then(data => {
         const isvalid = bcrypt.compareSync(password,  data[0].hash);
         if(isvalid){
           return db.select('*').from('users')
             .where('email','=',email)
             .then(user => {
                res.json(user[0]); 
             }).catch(err=>res.status(400).json(err))
         }else{
             res.status(400).json('wrong credentials')
         }
     })
     .catch(err => res.status(400).json(err))
 }

 module.exports = {
    handleSignIn : handleSignIn
 }