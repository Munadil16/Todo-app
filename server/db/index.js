import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "todo-app",
    });
    console.log("MongoDb Connected!");
  } catch (err) {
    console.log("MongoDb connection error: ", err);
  }
};

export default connectDb;
