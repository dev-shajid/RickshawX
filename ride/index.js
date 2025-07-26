require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()
const connect = require('./db/db')
connect()
const rideRoutes = require('./routes/ride.route')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', rideRoutes)


app.listen(3003, () => {
    console.log('🛺 Ride service is running on port 3003');
});