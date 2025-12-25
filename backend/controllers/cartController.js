import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const updatedCart = { ...userData.cartData };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        
        await userModel.findByIdAndUpdate(userId, { cartData: updatedCart });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const updatedCart = { ...userData.cartData };
        if (updatedCart[itemId] > 0) {
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId];
            }
        }
        
        await userModel.findByIdAndUpdate(userId, { cartData: updatedCart });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

const getCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        const updatedCart = { ...userData.cartData };
        res.json({success:true,cartData: updatedCart })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}
