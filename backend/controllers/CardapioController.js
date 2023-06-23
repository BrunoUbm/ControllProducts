const Products = require('../models/Products')


class CardapioController{

    async Products(req, res){
        try {
            const product = await Products.search()
            res.json(product)
            res.status(200)
        } 
        catch (error) {
            console.log(error);
            res.status(404)
        }
    }

    async FindById(req, res){
        const id = req.params.id

        try {
            const findId = await Products.searchId(id)
            res.json(findId)
            res.status(200)
        } 
        catch (error) {
            res.status(404)
            console.log(error);
        }
    }

    async Adicionar(req, res) {
        const {categoria, produto, ingredientes, preco, disponibilidade} = req.body

        try {
            await Products.insert(categoria, produto, ingredientes, preco, disponibilidade)
            res.send("Enviado com sucesso")
            res.status(200)
        }
        catch (error) {
            console.log(error);
            res.status(404)
            res.json({err: "Falha ao enviar!"})
        }
    }

    async DeleteElements(req, res){
        const id = req.params.id

        try {
            await Products.Delete(id)
            res.status(200)
            res.json({success: "Deletado com sucesso!"})  
        } 
        catch (error) {
            res.status(404)
            res.json({err: "Falha ao deletar!"})
        }
    }

    async EditElements(req, res){
        const id = req.params.id
        const {categoria, produto, ingredientes, preco, disponibilidade} = req.body

        try {
            await Products.Edit(id, categoria, ingredientes, produto, preco, disponibilidade)
            res.status(200)
            res.json({success: "Editado com sucesso!"})  
        } 
        catch (error) {
            res.status(404)
            res.json({err: "Falha ao editar!"})
        }
    }

}

module.exports = new CardapioController()