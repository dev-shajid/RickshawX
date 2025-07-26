const express = require('express')
const expressProxy = require('express-http-proxy')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', expressProxy('http://localhost:4001'))
app.use('/captain', expressProxy('http://localhost:4002'))
app.use('/ride', expressProxy('http://localhost:4003'))
app.use('/admin', expressProxy('http://localhost:4004'))


app.listen(4000, () => {
    console.log('🚧 Main server listening on port 4000')
})