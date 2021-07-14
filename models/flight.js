import mongoose from "mongoose"

export {
    Flight,
}

const Schema = mongoose.Schema

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"],
    },
    airport: {
        type: String,
        enum: ["DFW", "DEN", "LAX", "SAN"],
        default: "DEN",
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function (){
            let date = new Date()
            date.setFullYear(date.getFullYear() + 1)
            return date
        },
    },
}, { timestamps: true})

const Flight = mongoose.model("Flight", flightSchema)