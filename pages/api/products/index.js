import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'

dbConnect()

export default async function handler(req, res) {
    const { method, cookies } = req

    const token = cookies.token

    if(method === 'GET'){
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'POST'){
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
}