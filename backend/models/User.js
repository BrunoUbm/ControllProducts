const knex = require('../database/knex')
const bcrypt = require('bcrypt')


class Users{

    async cadastro(user, password){
        try {

            const hash = await bcrypt.hash(password, 10);

            await knex.insert({
                user: user, 
                password: hash
            }).into("users")
        } 
        catch (error) {
            console.log(error);
        }
    }

    async search(user){
        try {
            const UserSearch = await knex.select("*").where("user", user).table("users")
            return UserSearch
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Users()