import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'


const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <>
      <form className='place-order'>
        <div className="place-order-left">
          <p className="title">
            Delivery Informtion
          </p>
          <div className='multi-fields'>
            <input placeholder='First Name' type="text" />
            <input placeholder='Last Name' type="text" />
          </div>
          <input placeholder='Email Address' type="text" />
          <input placeholder='Street' type="text" />
          <div className='multi-fields'>
            <input placeholder='City' type="text" />
            <input placeholder='State' type="text" />
          </div>
          <div className='multi-fields'>
            <input placeholder='Zip Code' type="text" />
            <input placeholder='Country' type="text" />
          </div>
          <input type="text" placeholder='Phone' />
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