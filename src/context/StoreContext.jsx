import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
            const [cartItems, setCartItems] = useState({});
            const [token, setToken] = useState(localStorage.getItem("token") || "");
            const [food_list, setFoodList] = useState([]);
            const url = "https://backend-1-z3wj.onrender.com";
            const addToCart = async (itemId) => {
                        // Local cart state update (optimistic update)
                        if (!cartItems[itemId]) {
                                    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
                        } else {
                                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                        }

                        // Backend call
                        if (token) {
                                    try {
                                                await axios.post(`${url}/api/cart/add`,
                                                            { itemId }, // only itemId bhejna hai
                                                            {
                                                                        headers: {
                                                                                    Authorization: `Bearer ${token}`
                                                                        }
                                                            }
                                                );
                                    } catch (error) {
                                                console.error("Error adding to cart:", error.response?.data || error.message);
                                    }
                        }
            };

            const removeFromCart = (itemId) => {
                        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
                        //Backend call
                        if (token) {
                                    axios.post(`${url}/api/cart/remove`, { itemId }, {
                                                headers: {
                                                            Authorization: `Bearer ${token}`
                                                }
                                    }).catch((error) => {
                                                console.error("Error removing from cart:", error.response?.data || error.message);
                                    });
                        }
            }

            const loadCart = async () => {
                        try {
                                    let response = await axios.get(`${url}/api/cart/get`, {
                                                headers: {
                                                            token: `${token}`
                                                }
                                    });
                                    setCartItems(response.data.cartData);
                        } catch (error) {
                                    
                        }
            }
            const getTotalCartAmount = () => {
                        let totalamount = 0;
                        for (const item in cartItems) {
                                    if (cartItems[item] > 0) {
                                                let itemInfo = food_list.find((product) => product._id === item);
                                                totalamount += itemInfo.price * cartItems[item]
                                    }
                        }
                        return totalamount
            }


            const fetchFoodList = async () => {
                        try {
                                    const res = await axios.get(`${url}/api/food/list`);
                                    setFoodList(res.data.data);
                        } catch (error) {
                                    console.error("Error StoreContext mein foodlist nahi mili", error);
                        }
            };

            useEffect(() => {
                        const savedToken = localStorage.getItem("token");
                        if (savedToken) {
                                    setToken(savedToken);
                        }

                        const loadData = async () => {
                                    await fetchFoodList();
                        };

                        loadData();
            }, []);

            const contextValue = {
                        food_list,
                        cartItems,
                        setCartItems,
                        addToCart,
                        removeFromCart,
                        url,
                        token,
                        setToken,
                        getTotalCartAmount,
                        loadCart
            }
            return (
                        <StoreContext.Provider value={contextValue}>
                                    {children}
                        </StoreContext.Provider>
            )
}

export default StoreContextProvider