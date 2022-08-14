import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'

dbConnect()

export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req
    const token = cookies.token

    if(method === 'GET'){
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'PUT'){
        if(!token || token !== process.env.TOKEN){
            res.status(401).json('Not authenticated!')
        }
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    if(method === 'DELETE'){
        if(!token || token !== process.env.TOKEN){
            res.status(401).json('Not authenticated!')
        }
        try {
            await Product.findByIdAndDelete(id)
            res.status(200).json("Product has been deleted")
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}