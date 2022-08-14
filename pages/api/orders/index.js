import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'

dbConnect()

export default async function handler(req, res) {
    const { method, cookies } = req
    const token = cookies.token

    if(method === 'GET'){
        try {
            const orders = await Order.find()
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'POST'){
        if(!token || token !== process.env.TOKEN){
            res.status(401).json('Not authenticated!')
        }
        try {
            const order = await Order.create(req.body)
            res.status(201).json(order)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}