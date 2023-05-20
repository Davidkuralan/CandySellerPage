const express = require('express')

const sellerController = require('../controllers/sellerController')

const router = express.Router()

router.post('/add-product',sellerController.saveToStorage)

router.get('/get-products',sellerController.getAllProduct)

router.delete('/delete-product/:id',sellerController.deleteProduct)

module.exports = router