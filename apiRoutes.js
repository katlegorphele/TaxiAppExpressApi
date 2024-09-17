const express = require('express');
const router = express.Router();
const Passenger = require('./models/Passenger');
const TaxiBoss = require('./models/TaxiBoss');
const Driver = require('./models/Driver');
const Taxi = require('./models/Taxi');
const Route = require('./models/Route');
const Trip = require('./models/Trip')

// Create a new passenger
router.post('/passenger', async (req, res) => {
    try{
        const {name, walletAddress, email} = req.body;
        const newPassenger = new Passenger({name, walletAddress, email});
        const savedPassenger = await newPassenger.save();
        res.status(201).json(savedPassenger);
    } catch (err) {
        console.error('Error creating passenger',err);
        res.status(500).json({error: "Failed to create passenger"});
      }
});

// Create a new Driver
router.post("/driver",  async (req, res) => {
    try{
        const {name, taxiId, phoneNumber} = req.body;
        const newDriver = new Driver({name, taxiId, phoneNumber});
        const savedDriver = await newDriver.save();
        res.status(201).json(savedDriver);
    } catch (err) {
        console.error("Error creating driver:", err);
        res.status(500).json({error: "Failed to create driver"});
      }
});

// Create new taxiboss

router.post('/taxiboss', async (req, res) => {
    try{
        const {name, walletAddress} = req.body;
        const newTaxiBoss = new TaxiBoss({name, walletAddress});
        const savedTaxiBoss = await newTaxiBoss.save();
        res.status(201).json(savedTaxiBoss);
    } catch (err) {
        console.error("Error creating Taxi Boss", err);
        res.status(500).json({error: "Failed to create Taxi Boss"});
    }
});

//Create a new taxi
router.post('/taxi', async (req, res) => {
    try{
        const {taxiBossId, driverId, routeId} = req.body;
        const newTaxi = new Taxi({taxiBossId, driverId, routeId});
        const savedTaxi = await newTaxi.save();
        res.status(201).json(savedTaxi);
    } catch (err) {
        console.error("Error creating a new taxi",err);
        res.status(500).json({error: "Failed to create a new taxi"});
    }
});

// Create a new route
router.post('/route', async (req, res) => {
    try {
        const {taxiBossId, startLocation, endLocation, cost} = req.body;
        const newRoute = new Route({taxiBossId, startLocation, endLocation, cost});
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (err) {
        console.error("Error creating route",err);
        res.status(500).json({error: "Failed to create route"});
    }
});

// Create a new trip
router.post('/trip', async (req, res) => {
    try{
        const {passengerId, taxiId, cost, paymentStatus} = req.body;
        const newTrip = new Trip ({passengerId, taxiId, routeId, cost, paymentStatus});
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error("Error creating trip",err);
        res.status(500).json({error:"Failed to create trip"});
    }
});


module.exports = router;
