import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_URL,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established!");
    }
  );
};

export default connectToMongo;
