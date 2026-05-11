const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d0bvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const spotCollection = client.db('exploreSEAsiaDB').collection('spots');
        const reviewCollection = client.db('exploreSEAsiaDB').collection('reviews');
        const wishlistCollection = client.db('exploreSEAsiaDB').collection('wishlists');

        // ============ SPOTS ENDPOINTS ============
        app.get('/spots', async (req, res) => {
            const cursor = spotCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/spots/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await spotCollection.findOne(query);
            res.send(result);
        })

        app.get('/spots/byuser/:id', async (req, res) => {
            const id = req.params.id;
            const query = { userEmail: id };
            const cursor = await spotCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/spots', async (req, res) => {
            const newSpot = req.body;
            console.log(newSpot);
            const result = await spotCollection.insertOne(newSpot);
            res.send(result);
        })

        app.put('/spots/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedSpot = req.body;
            const spot = {
                $set: {
                    spotName: updatedSpot.spotName,
                    country: updatedSpot.country,
                    location: updatedSpot.location,
                    image: updatedSpot.image,
                    description: updatedSpot.description,
                    totalVisitors: updatedSpot.totalVisitors,
                    seasonality: updatedSpot.seasonality,
                    averageCost: updatedSpot.averageCost,
                    travelDuration: updatedSpot.travelDuration,
                    userName: updatedSpot.userName,
                    userEmail: updatedSpot.userEmail
                }
            }
            const result = await spotCollection.updateOne(filter, spot, options);
            res.send(result);
        })

        app.delete('/spots/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await spotCollection.deleteOne(query);
            res.send(result);
        })

        // ============ REVIEWS ENDPOINTS ============
        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/reviews/:spotId', async (req, res) => {
            const spotId = req.params.spotId;
            const query = { spotId: spotId };
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/reviews', async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        })

        app.put('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedReview = req.body;
            const review = {
                $set: {
                    rating: updatedReview.rating,
                    comment: updatedReview.comment,
                    likes: updatedReview.likes
                }
            }
            const result = await reviewCollection.updateOne(filter, review);
            res.send(result);
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        // ============ WISHLIST ENDPOINTS ============
        app.get('/wishlists', async (req, res) => {
            const cursor = wishlistCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/wishlists/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const cursor = wishlistCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/wishlists', async (req, res) => {
            const newWishlist = req.body;
            // Check if already exists
            const exists = await wishlistCollection.findOne({
                userEmail: newWishlist.userEmail,
                spotId: newWishlist.spotId
            });
            
            if (exists) {
                return res.status(400).send({ message: 'Already in wishlist' });
            }
            
            const result = await wishlistCollection.insertOne(newWishlist);
            res.send(result);
        })

        app.delete('/wishlists/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await wishlistCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/wishlists/user/:email/:spotId', async (req, res) => {
            const email = req.params.email;
            const spotId = req.params.spotId;
            const query = { userEmail: email, spotId: spotId };
            const result = await wishlistCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ExploreSEAsia Server is running.');
})

app.listen(port, () => {
    console.log('Server running on port: ', port);
})