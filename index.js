const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const userRouter = require('./Routes/userRouter.js')
require('dotenv').config();
require('./Models/db')

app.use(bodyParser.json());
const options = {
    origin: [process.env.CLIENT_BASE_URL],
    methods: ["GET", "POST", "PATCH"],
}
app.use(cors(
    options
));

app.use(userRouter)


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

app.get('/ping', (req, res) => {
    res.send('PONG');
});


