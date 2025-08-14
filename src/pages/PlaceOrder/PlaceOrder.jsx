import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    let user = localStorage.getItem("user");

    let response = await axios.post(url + "/api/order/place", {
      orderData,
      userId: user ? JSON.parse(user)._id : "",
    }, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      toast.error(response.data.message || "Something went wrong");
    }

  }
  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">
            Delivery Informtion
          </p>
          <div className='multi-fields'>
            <input required value={data.firstName} name='firstName' onChange={handleChange} placeholder='First Name' type="text" />
            <input required value={data.lastName} name="lastName" onChange={handleChange} placeholder='Last Name' type="text" />
          </div>
          <input required value={data.email} name="email" onChange={handleChange} placeholder='Email Address' type="text" />
          <input required value={data.street} name="street" onChange={handleChange} placeholder='Street' type="text" />
          <div className='multi-fields'>
            <input required value={data.city} name="city" onChange={handleChange} placeholder='City' type="text" />
            <input required value={data.state} onChange={handleChange} name='state' placeholder='State' type="text" />
          </div>
          <div className='multi-fields'>
            <input required value={data.zipcode} onChange={handleChange} name='zipcode' placeholder='Zip Code' type="text" />
            <input required value={data.country} onChange={handleChange} name='country' placeholder='Country' type="text" />
          </div>
          <input required value={data.phone} onChange={handleChange} name='phone' type="number" placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button>Proceed to payment</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder