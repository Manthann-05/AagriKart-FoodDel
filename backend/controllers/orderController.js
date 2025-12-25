import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from 'razorpay';
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const options = {
            amount: req.body.amount*100,
            currency: "INR",
            receipt: `order_${newOrder._id}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: newOrder._id,
            key: process.env.RAZORPAY_API_KEY,
        });

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Order Failed"})
    }
}

const verifyOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentId: razorpay_payment_id,
      });

      res.json({ success: true, message: "Payment verified" });
    } 
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Invalid signature"  });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Verification failed" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Cancel failed" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
} 

const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

export {placeOrder, verifyOrder, cancelOrder, userOrders, listOrders, updateStatus}