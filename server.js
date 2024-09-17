import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import next from 'next';
import { connect } from 'mongoose';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;


//import routes
import apiRoutes from './apiRoutes';

// Connect to MongoDB
connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Create the server instance
app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(json());

  //API Routes
  server.use('/api',apiRoutes);


// API Routes
/*  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the Express server!' });
  });

  server.post("/api/trip", async (req, res) => {
  try {
  	const { passengerId, taxiOwnerId, route, cost } = req.body;

	  // Create new trip
	  const newTrip = new Trip({
		  passengerId,
		  taxiOwnerId,
		  route,
		  cost
	  });

	  //Save trip to mongodb
	  const savedTrip = await newTrip.save();
	  res.status(201).json(savedTrip);
      } catch (err) {
	console.error("Error creating trip:", err);
	res.status(500).json({error: "Failed to create trip"});
      }
  });

  server.get("/api/trips", async (req, res) => {
    try {
	    // FETCH ALL TRIPS
	    const trips = await Trip.find();

	    res.status(200).json(trips);
    	} catch (err) {
	  console.error("Error fetching trips:", err);
	  res.status(500).json({error: "Failed to fetch trips"});
	}
  });

  server.get("/api/trip/:id", async (req, res) => {
	  try{
		  const tripId = req.params.id;
		  const trip = await Trip.findById(tripId);

		  if (!trip) {
			return res.status(404).json({error: "Trip not found"});
		  }

		  res.status(200).json(trip);
	  } catch (err) {
		console.error("Error fetching trip:", err);
		  res.status(500).json({error:"Failed to fetch trip"});
	  }
  }); */

  // Handle Next.js Pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

