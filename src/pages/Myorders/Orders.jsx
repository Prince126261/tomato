import React, { useContext, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/assets' // Assuming you have a placeholder image

const Orders = () => {
            const [data, setData] = useState([]);
            const { url } = useContext(StoreContext);
            const user = JSON.parse(localStorage.getItem('user'));
            const fetchOrders = async () => {
                        const response = await axios.post(`${url}/api/order/userorders`, {
                                    userId: user._id
                        })
                        setData(response.data.orders)
            }
            useState(() => {
                        fetchOrders();
            }, []);

            console.log("Fetched orders:", data);
            return (
                        <div className="my-orders">
                                    <h2>{user.name}'s Orders</h2>
                                    <div className="container">
                                                {data.map((order, i) => {
                                                            return (
                                                                        <div key={i} className="my-orders-order">
                                                                                    <img src={assets.parcel_icon} alt="" />
                                                                                    <p>{order.items.map((parcel, i) => {
                                                                                                if (i === order.items.length - 1) {
                                                                                                            return `${parcel.name} X ${parcel.quantity}`;
                                                                                                }else{
                                                                                                            return `${parcel.name} X ${parcel.quantity} , `;   
                                                                                                }
                                                                                    })}</p>
                                                                                    <p>${order.amount}.00</p>
                                                                                    <p>Items: {order.items.length}</p>
                                                                                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                                                                    <button>Track Order</button>
                                                                        </div>
                                                            )
                                                })}
                                    </div>
                        </div>
            )
}

export default Orders