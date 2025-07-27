require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()
const connect = require('./db/db')
connect()
const captainRoutes = require('./routes/captain.route')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', captainRoutes)

// Add to backend/user/index.js
app.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'User Service',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        port: process.env.PORT || 4001
    })
})


app.listen(4002, () => {
    console.log('🧑‍✈️ Captain service is running on port 4002');
});