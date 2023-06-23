const express = require("express")
const router = express.Router()
const CardapioController = require('../controllers/CardapioController')
const UsersController = require('../controllers/UsersController')
// const AdminAuth = require('../middleware/AdminAuth')


router.get('/',CardapioController.Products)
router.get('/:id', CardapioController.FindById)
router.post('/user', UsersController.loginUser)
router.post('/produtos', CardapioController.Adicionar)
router.delete('/produto/:id', CardapioController.DeleteElements)
router.put('/produto/:id', CardapioController.EditElements)
router.post('/users', UsersController.CreateUser)


module.exports = router