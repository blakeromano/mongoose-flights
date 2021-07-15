import mongoose from "mongoose"

export {
    Destination,
}

const Schema = mongoose.Schema

const destinationSchema = new Schema({
    airport: {
        type: String,
        unique: true,
    }
})


const Destination = mongoose.model("Destination", destinationSchema)