import React from 'react'
import { useState } from 'react'
import styles from '../styles/OrderDetails.module.css'

const OrderDetails = ({ total, createOrder }) => {
    const [customer, setCustomer] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [address, setAddress] = useState('')

    const handleClick = () => {
        createOrder({customer, address, total, method: 0})
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>You will pay ${total} after delivery</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input placeholder='John Doe' type='text' className={styles.input} onChange={(e) => setCustomer(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input placeholder='+91 89787 87666' type='number' className={styles.input} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea placeholder='Elton St. 500 NV' type='text' className={styles.input} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button onClick={handleClick} className={styles.button}>Order</button>
            </div>
        </div>
    )
}

export default OrderDetails