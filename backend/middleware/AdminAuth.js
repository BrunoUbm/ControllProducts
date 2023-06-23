const jwt = require('jsonwebtoken')


const secret = ""

module.exports = function(req, res, next){
    const AuthToken = req.headers['authorization']

    if (AuthToken != undefined) {
        const bearer = AuthToken.split(' ')
        const token = bearer[1]

        const decoded = jwt.verify(token, secret)

        console.log(decoded);
        next()
    }
    else{
        res.status(403)
        res.send("Erro de autenticação!")
    }
}