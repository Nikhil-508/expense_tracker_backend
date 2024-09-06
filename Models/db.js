const mongoose = require('mongoose')

const mongo_conn = process.env.MONGO_URI

mongoose.connect(mongo_conn)
.then(() => console.log("Database is connected..."))
.catch((err) => {
    console.log("Database connection error:", err);
});
