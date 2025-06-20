import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 10000
    });
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
};
