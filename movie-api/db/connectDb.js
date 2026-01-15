import mongoose from "mongoose";

const connectDb = async (Db_URL, Db_Name) => {
  try {
    await mongoose.connect(Db_URL, { dbName: Db_Name });
    console.log(`✅ Database connection successful: ${Db_Name}`);
  } catch (error) {
    console.log(`❌ Database connection failed: ${error.message}`);
  }
};

export default connectDb;
