const usuarios = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'owfb9wefb9498fhwofowef9e8efio3oin'


class UsersController{

    async CreateUser(req, res) {
        const {user, password} = req.body

        try {
            await usuarios.cadastro(user, password)
            res.status(200)
            res.json({success: "Cadastro feito com sucesso!"})
        } 
        catch (error) {
            console.log(error);
            res.status(404)
            res.json({err: "Erro ao cadastrar usuário!"})
        }
    }

    async loginUser(req, res) {
        const {user, password} = req.body

        try {
            const userBody = await usuarios.search(user)
            if (userBody != undefined) {
                const result = await bcrypt.compare(password, userBody[0].password)
                if (result) {
                    const token = jwt.sign({ user: userBody[0].user }, secret);

                    res.status(200)
                    res.json(token)
                }
                else{
                    res.status(406)
                    res.json({err: "Usuário não encontrado!"})
                }
            }
            else{
                res.json({status: false})
            }
            res.json(userBody)
        } 
        catch (error) {
            res.status(404)
        }

    }

}

module.exports = new UsersController()