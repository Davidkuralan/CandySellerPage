const path = require('path')

const rootDir = require('../util/path')
const Seller = require('../modals/sellerModal')
const { setEngine } = require('crypto')

exports.saveToStorage = async(req,res,next) =>{

    const price = req.body.priceAdd
    const product = req.body.productAdd
    const category = req.body.categoryAdd

    if ( !price || !product  || !category){
        return res.status(400).json({error:'Enter all fields'})
    }
    try{
        const data = await Seller.create(
            {sellingPrice:price,
            productName:product,
            category:category})
        res.status(200).json({ProductAdded:data})
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }

}

exports.getAllProduct = async(req,res,next) =>{
    try{
        Seller.findAll()
        .then((products) =>{
            res.status(201).json(products)
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

exports.deleteProduct = async(req,res,next) =>{
    console.log(req.params.id)
    if(!req.params.id){
        res.status(400).json({error:"Missing ID for Deleted Product"})
    }
    try{
        const deleteId = req.params.id
        Seller.destroy({where:{id:deleteId}})
        console.log("Product Successfully Deleted")

    }catch(error){
        console.log(err)
        req.status(500).json({error:error})
    }
}