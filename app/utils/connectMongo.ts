import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "";
console.log(MONGO_URI);


const connectMongo = async () => {
    console.log({MONGO_URI});
    
    mongoose.connect(
        MONGO_URI,
      )
}



export default connectMongo;