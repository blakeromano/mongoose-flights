export {
    index,
    newFlight,
    create,
}

import { Flight } from "../models/flight.js"

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