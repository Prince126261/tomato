import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "./src/context/StoreContext";

export default function ProtectedRoute({ children }) {
            const navigate = useNavigate();
            const { token } = useContext(StoreContext);
            const { getTotalCartAmount } = useContext(StoreContext);
            useEffect(() => {
                        if (token === null) {
                                    navigate("/");
                        }else if(getTotalCartAmount() === 0) {
                                    navigate("/cart");
                        }
            }, [token, getTotalCartAmount, navigate]);

            return children;
}
