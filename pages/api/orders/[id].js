import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'

dbConnect()

export default async function handler(req, res) {
    const { method, query: { id }, cookies } = req
    const token = cookies.token
    
    if(method === 'GET'){
        try {
            const order = await Order.findById(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if(method === 'PUT'){
        if(!token || token !== process.env.TOKEN){
            res.status(401).json('Not authenticated!')
        }
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
            })
            res.status(200).json(order)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}