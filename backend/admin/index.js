require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()
const connect = require('./db/db')
connect()
const adminRoutes = require('./routes/admin.route')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/', adminRoutes)

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


app.listen(4004, () => {
    console.log('💁‍♂️ Admin service is running on port 4004');
});