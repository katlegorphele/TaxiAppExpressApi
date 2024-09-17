import { Router } from 'express';
const router = Router();
import Passenger from './models/Passenger';
import TaxiOwner from './models/TaxiBoss';
import Driver from './models/Driver';
import Taxi from './models/Taxi';
import Route from './models/Route';
import Trip from './models/Trip';

// Create a new passenger
router.post('/passenger', async (req, res) => {
    try{
        const {name, walletAddress, email, phoneNumber} = req.body;
        const newPassenger = new Passenger({name, walletAddress, email, phoneNumber});
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
        const {name, walletAddress, phoneNumber, taxiId} = req.body;
        const newDriver = new Driver({name, walletAddress, phoneNumber, taxiId});
        const savedDriver = await newDriver.save();
        res.status(201).json(savedDriver);
    } catch (err) {
        console.error("Error creating driver:", err);
        res.status(500).json({error: "Failed to create driver"});
      }
});

// Create new taxiowner

router.post('/taxiowner', async (req, res) => {
    try{
        const {name, walletAddress, phoneNumber} = req.body;
        const newTaxiBoss = new TaxiOwner({name, walletAddress, phoneNumber});
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
        const {licensePlate, taxiOwnerId, routeId, driverId, type, numberOfSeats} = req.body;
        const newTaxi = new Taxi({licensePlate, taxiOwnerId, routeId, driverId, type, numberOfSeats});
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
        const {startPoint, endPoint, price, taxiOwnerId} = req.body;
        const newRoute = new Route({startPoint, endPoint, price, taxiOwnerId});
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
        const {passengerId, taxiId, routeId, cost} = req.body;
        const newTrip = new Trip ({passengerId, taxiId, routeId, cost});
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error("Error creating trip",err);
        res.status(500).json({error:"Failed to create trip"});
    }
});


export default router;
