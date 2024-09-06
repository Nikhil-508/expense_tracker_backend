const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const AuthRouter = require('./Routes/AuthRouter')

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();
require('./Models/db')


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use("/auth",AuthRouter)


