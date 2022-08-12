import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'

dbConnect()

export default async function handler(req, res) {
    const { method, query: { id } } = req

    if(method === 'GET'){
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'PUT'){
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    if(method === 'DELETE'){
        try {
            await Product.findByIdAndDelete(id)
            res.status(200).json("Product has been deleted")
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}