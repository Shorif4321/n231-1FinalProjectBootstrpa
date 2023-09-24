const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3000

const app = express()

//midleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.guep9xh.mongodb.net/?retryWrites=true&w=majority`;

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
        const database = client.db('231-1DoctorsPortal');
        const appointmentOptionCollection = database.collection('appointmentOptions');
        const bookingCollection = database.collection('Bookings')

        app.get('/appointmentOptions', async (req, res) => {
            const query = {};
            const result = await appointmentOptionCollection.find(query).toArray();
            res.send(result)
        })


        app.post('/bookings', async (req, res) => {
            const bookings = req.body;
            const result = await bookingCollection.insertOne(bookings);
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Doctors Portal is ready!')
})

app.listen(port, () => {
    console.log(`Our Doctros Portal run on port ${port}`)
})