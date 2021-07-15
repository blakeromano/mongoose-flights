import mongoose from "mongoose"

export {
    Flight,
}

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    seatNumber: {
        type: String,
        match: /[A-F][1-9]\d?/,
    },
    price: {
        type: Number,
        min: 0,
    },
})

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
    tickets: [ticketSchema],
    destinations: [{
        type: Schema.Types.ObjectId,
        ref: "Destination"
    }]
}, { timestamps: true})

const Flight = mongoose.model("Flight", flightSchema)