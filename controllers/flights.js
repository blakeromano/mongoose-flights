export {
    index,
    newFlight,
    create,
    show,
    createTicket,
    addToDestinations,
}

import { Flight } from "../models/flight.js"
import { Destination } from "../models/destination.js"

function index (req, res){
    Flight.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("flights/index" , { title: "All Flights", Flights: result})
    })
    .catch(err => {
        console.log(err)
    })
}

function newFlight (req, res) {
    res.render("flights/new", { title: "New Flight"})
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    const flight = new Flight(req.body)
    flight.save()
    .then(result => res.redirect("/flights"))
    .catch(err => {
        console.log(err)
        res.redirect("/flights/new")
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
    .populate("destinations")
    .exec()
    .then(flight => {
        Destination.find({_id: {$nin: flight.destinations}}, function (err, destinations) {
            res.render("flights/show", {
                title: "Flight Details",
                flight: flight,
                destinations: destinations,
            })
        })
    })
    .catch(err => console.log(err))
}

function createTicket(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(result => res.redirect(`/flights/${flight._id}`))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function addToDestinations(req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.destinations.push(req.body.destinationId)
        flight.save()
        .then(result => res.redirect(`/flights/${flight._id}`))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}