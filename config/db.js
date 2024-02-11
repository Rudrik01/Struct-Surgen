import mongoose from 'mongoose';

const mongoURI ='mongodb+srv://Struct:EIQJ7owXkHX8Jf3I@cluster0.cubv7tu.mongodb.net/structsurgen'
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(mongoURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })// Increase timeout value)
        console.log(`Connected To Mongodb struct surgen Database`)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
    }
}

export default connectDB;