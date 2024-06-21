const express = require('express');
const cors = require('cors');
const app = express();

const {route} = require('./routes/userRoute')


app.use(cors())
app.use(express.json())

app.use(route)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, (req, res) => {
    console.log('server up and running!')
})