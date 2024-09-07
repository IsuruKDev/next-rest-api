import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log("Already connected");
        return
    }

    if (connectionState === 2) {
        console.log("Connecting...");
        return
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: process.env.DB_NAME,
            bufferCommands: true
        });
    } catch (err: any) {
        console.error(`Error : ${err}`);
        throw Error(err);
    }
}

export default connect;