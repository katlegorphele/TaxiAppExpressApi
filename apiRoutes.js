import { Router } from 'express';
const router = Router();
import Passenger from './models/Passenger.js';
import TaxiOwner from './models/TaxiBoss.js';
import Driver from './models/Driver.js';
import Taxi from './models/Taxi.js';
import Route from './models/Route.js';
import Trip from './models/Trip.js';

// Check if routes are working
/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a simple greeting
 *     responses:
 *       200:
 *         description: A successful response
 *       500:
 *         description: An error response
 */
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });

// Create a new passenger
/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 * 
 * /api/passenger:
 *   post:
 *     summary: Create a new passenger
 *     tags: [Passenger]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The name of the passenger
 *               walletAddress:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 description: The wallet address of the passenger
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *                 description: The email address of the passenger
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the passenger
 *     responses:
 *       201:
 *         description: Successfully created a new passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the newly created passenger
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *       500:
 *         description: An error occurred while creating the passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create passenger"
 */

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

// Get all passengers
/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 *
 * /api/passengers:
 *   get:
 *     summary: Get all passengers
 *     tags: [Passenger]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of passengers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The unique ID of the passenger
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                     description: The name of the passenger
 *                   walletAddress:
 *                     type: string
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                     description: The wallet address of the passenger
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                     description: The email address of the passenger
 *                   phoneNumber:
 *                     type: string
 *                     example: "+1234567890"
 *                     description: The phone number of the passenger
 *       500:
 *         description: An error occurred while fetching passengers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch passengers"
 */
router.get('/passengers', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).json(passengers);
    } catch (err) {
        console.error("Error fetching passengers",err);
        res.status(500).json({error: "Failed to fetch passengers"});
    }
});

// Get passenger by walletAddress
/**
 * @swagger
 * tags:
 *   name: Passenger
 *   description: API endpoints for managing passengers
 *
 * /api/passenger/{walletAddress}:
 *   get:
 *     summary: Get a passenger by wallet address
 *     tags: [Passenger]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the passenger to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the passenger
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                   description: The name of the passenger
 *                 walletAddress:
 *                   type: string
 *                   example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   description: The wallet address of the passenger
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                   description: The email address of the passenger
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *                   description: The phone number of the passenger
 *       404:
 *         description: Passenger not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Passenger not found"
 *       500:
 *         description: An error occurred while fetching the passenger
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch passenger"
 */
router.get('/passenger/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const passenger = await Passenger
        .findOne({walletAddress: walletAddress});
        if (!passenger) {
            return res.status(404).json({error: "Passenger not found"});
        }
        res.status(200).json(passenger);
    } catch (err) {
        console.error("Error fetching passenger",err);
        res.status(500).json({error: "Failed to fetch passenger"});
    }
});

// Create a new Driver
/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 *
 * /api/driver:
 *   post:
 *     summary: Create a new driver
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alice Johnson"
 *                 description: The name of the driver
 *               walletAddress:
 *                 type: string
 *                 example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 description: The wallet address of the driver
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the driver
 *               taxiId:
 *                 type: string
 *                 example: "605c72ef1f1b2c001f8b4567"
 *                 description: The ID of the taxi assigned to the driver
 *     responses:
 *       201:
 *         description: Successfully created a new driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the newly created driver
 *                 name:
 *                   type: string
 *                   example: "Alice Johnson"
 *                 walletAddress:
 *                   type: string
 *                   example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *                 taxiId:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *       500:
 *         description: An error occurred while creating the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create driver"
 */

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

// Get all drivers
/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 *
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The unique ID of the driver
 *                   name:
 *                     type: string
 *                     example: "Alice Johnson"
 *                     description: The name of the driver
 *                   walletAddress:
 *                     type: string
 *                     example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                     description: The wallet address of the driver
 *                   phoneNumber:
 *                     type: string
 *                     example: "+1234567890"
 *                     description: The phone number of the driver
 *                   taxiId:
 *                     type: string
 *                     example: "605c72ef1f1b2c001f8b4567"
 *                     description: The ID of the taxi assigned to the driver
 *       500:
 *         description: An error occurred while fetching drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch drivers"
 */
router.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (err) {
        console.error("Error fetching drivers",err);
        res.status(500).json({error: "Failed to fetch drivers"});
    }
});

// Get driver by walletAddress
/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: API endpoints for managing drivers
 *
 * /api/driver/{walletAddress}:
 *   get:
 *     summary: Get a driver by wallet address
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the driver to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the driver
 *                 name:
 *                   type: string
 *                   example: "Alice Johnson"
 *                   description: The name of the driver
 *                 walletAddress:
 *                   type: string
 *                   example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                   description: The wallet address of the driver
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *                   description: The phone number of the driver
 *                 taxiId:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The ID of the taxi assigned to the driver
 *       404:
 *         description: Driver not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Driver not found"
 *       500:
 *         description: An error occurred while fetching the driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch driver"
 */
router.get('/driver/:walletAddress', async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const driver = await Driver
        .findOne({walletAddress: walletAddress});
        if (!driver) {
            return res.status(404).json({error: "Driver not found"});
        }
        res.status(200).json(driver);
    } catch (err) {
        console.error("Error fetching driver",err);
        res.status(500).json({error: "Failed to fetch driver"});
    }
});




// Create new taxiowner
/**
 * @swagger
 * tags:
 *   name: TaxiOwner
 *   description: API endpoints for managing taxi owners
 *
 * /api/taxiowner:
 *   post:
 *     summary: Create a new taxi owner
 *     tags: [TaxiOwner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Smith"
 *                 description: The name of the taxi owner
 *               walletAddress:
 *                 type: string
 *                 example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 description: The wallet address of the taxi owner
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: The phone number of the taxi owner
 *     responses:
 *       201:
 *         description: Successfully created a new taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef1f1b2c001f8b4567"
 *                   description: The unique ID of the newly created taxi owner
 *                 name:
 *                   type: string
 *                   example: "John Smith"
 *                 walletAddress:
 *                   type: string
 *                   example: "0xabcdef1234567890abcdef1234567890abcdef12"
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *       500:
 *         description: An error occurred while creating the taxi owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create Taxi Boss"
 */

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
