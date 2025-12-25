import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Manthann-05:1234509876@cluster0.n3hcm7a.mongodb.net/AagriKart')
    .then(()=>{
        console.log("DB Connected")
    })
}