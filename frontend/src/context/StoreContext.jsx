import { createContext, useEffect, useState, useMemo } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:3000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [promoCode, setPromoCode] = useState("");
    const [promoTried, setPromoTried] = useState(false);
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const applyPromo = () => {
        setPromoTried(true);
        const code = promoCode.trim().toUpperCase();
        setIsPromoApplied(code === "AAGRI20");
    };

    const clearPromo = () => {
        setPromoCode("");
        setPromoTried(false);
        setIsPromoApplied(false);
    };

    const getDeliveryFee = () => (getTotalCartAmount() === 0 ? 0 : 2);

    const getDiscountAmount = () => {
        const subtotal = getTotalCartAmount();
        return isPromoApplied ? Math.round(subtotal * 0.2) : 0;
    };

    const getFinalTotal = () => {
        const subtotal = getTotalCartAmount();
        if (subtotal === 0) return 0;
        return subtotal - getDiscountAmount() + getDeliveryFee();
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((e) => ({ ...e, [itemId]: 1 }))
        }
        else {
            setCartItems((e) => ({ ...e, [itemId]: e[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((e) => ({ ...e, [itemId]: e[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) =>
                    product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData)
    }

    const clearCart = async () => {
        try {
            await axios.post(
                url + "/api/cart/clear",
                {},
                { headers: { token } }
            );
            setCartItems({});
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            clearPromo();
        }
    }, [cartItems]);

    const contextValue = useMemo(() => ({
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        clearCart,

        promoCode,
        setPromoCode,
        promoTried,
        setPromoTried,
        isPromoApplied,
        setIsPromoApplied,
        applyPromo,
        clearPromo,
        getDeliveryFee,
        getDiscountAmount,
        getFinalTotal
    }), [
        food_list,
        cartItems,
        url,
        token,
        promoCode,
        promoTried,
        isPromoApplied
    ]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;