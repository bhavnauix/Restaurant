import React, { useState } from 'react'
import styles from '../styles/Add.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const Add = ({ setClose }) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([])

    const changePrice = (e, index) => {
        const currentPrices = prices
        currentPrices[index] = e.target.value 
        setPrices(currentPrices)
    }

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value})
    }

    const handleExtra = (e) => {
        setExtraOptions(prev => [...prev, extra])
    }

    const handleCreate = async(e) => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'uploads')
        try {
            const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/bhavnablog/image/upload`, data)
            const { url } = uploadRes.data
            const newProduct = { title, desc, prices, extraOptions, img: url}
            await axios.post('http://localhost:3000/api/products', newProduct)
            setClose(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setClose(true)} className={styles.close}>X</span>
                <h1 className={styles.title}>Add New Product</h1>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Choose an image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Title</label>
                    <input type="text" className={styles.input} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Description</label>
                    <textarea type="text" rows={4} onChange={(e) => setDesc(e.target.value)}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Prices</label>
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Small' onChange={(e) => changePrice(e, 0)}/>
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Medium' onChange={(e) => changePrice(e, 1)}/>
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Large' onChange={(e) => changePrice(e, 2)}/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input type="text" placeholder='Item' name='text' className={styles.input} onChange={handleExtraInput}/>
                        <input type="number" placeholder='Price' name='price' className={styles.input} onChange={handleExtraInput}/>
                        <button className={styles.extraButton} onClick={handleExtra}>Add</button>
                    </div>
                </div>
                <div className={styles.extraItems}>
                    {extraOptions.map(option => (
                        <span key={option.text} className={styles.extraItem}>{option.text}</span>
                    ))}
                </div>
                <button className={styles.addButton} onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}

export default Add