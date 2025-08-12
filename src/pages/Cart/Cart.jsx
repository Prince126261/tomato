import { useContext } from 'react';
import "./Cart.css";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, url, getTotalCartAmount } = useContext(StoreContext);

  // Filter the items which are actually in the cart
  const cartFoodItems = food_list.filter(food => cartItems[food._id] > 0);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        {cartFoodItems.length > 0 ? (
          <>
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {cartFoodItems.map((food, index) => (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${food.image}`} alt="" />
                  <p>{food.name}</p>
                  <p>$ {food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>$ {food.price * cartItems[food._id]}</p>
                  <p onClick={() => removeFromCart(food._id)} className='remove'>X</p>
                </div>
                <hr />
              </div>
            ))}
          </>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/" id='link'>
              Buy Items
            </Link>
          </div>
        )}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate("/order")}>Proceed to payment</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a Promo Code, Enter here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
