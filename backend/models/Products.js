const knex = require('../database/knex')

class Products{

    async search(){
        try {
            const product = await knex.select("").table("cardapio")
            return product
        } 
        catch (error) {
            console.log(error);
        }
    }

    async searchId(id){
        try{
            const searchProd = await knex.select("").where("id", id).table("cardapio")
            return searchProd
        }
        catch (err){
            console.log(err);
        }
    }

    async insert(categoria, produto, ingredientes, preco, disponibilidade){
        try {
            await knex.insert({
                categoria: categoria, 
                produto: produto, 
                ingredientes: ingredientes,
                preco: preco,
                disponibilidade: disponibilidade
            }).into("cardapio")
            return true
        } 
        catch (error) {
            console.log(error);
        }
    }

    async Delete(id){
        try {
            await knex.delete().where("id", id).table("cardapio")
            return true   
        } 
        catch (error) {
            
        }
    }

    async Edit(id, categoria, produto, ingredientes, preco, disponibilidade){
        try {
            await knex.update({
                categoria: categoria, 
                produto: produto,
                ingredientes: ingredientes,
                preco: preco,
                disponibilidade: disponibilidade
            }).where("id", id).table("cardapio")
        } 
        catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Products()