import React, { useContext } from 'react'
import "./Item.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const Item = ({ id, name, price, description, image }) => {
            const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
            return (
                        <div className='item'>
                                    <div className="item_image_container">
                                                <img src={`${url}/images/${image}`} alt="" className="food_item_image" />
                                                {
                                                            !cartItems[id] ? <img className='add' onClick={() => { addToCart(id) }} src={assets.add_icon_white} alt="" /> : <div className='food_item_couter'>
                                                                        <img id='p' onClick={() => { removeFromCart(id) }} src={assets.remove_icon_red} alt="image" className='img' />
                                                                        <p>{cartItems[id]}</p>
                                                                        <img id='p' onClick={() => { addToCart(id) }} src={assets.add_icon_green} alt="" className='img' />
                                                            </div>
                                                }

                                    </div>
                                    <div className="food_item_info">
                                                <div className="food_item_name_rating">
                                                            <p>{name}</p>
                                                            <img src={assets.rating_starts} alt="" />
                                                </div>
                                                <p className="food_item_desc"> {description}</p>
                                                <p className='food_item_price'>${price}</p>
                                    </div>
                        </div>
            )
}

export default Item