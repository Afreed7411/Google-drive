const mongoose = require('mongoose');

function connectToDB() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("Error: MONGO_URI is not defined. Please check your environment variables.");
        process.exit(1); // Exit the application if the URI is missing
    }

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
}

module.exports = connectToDB;
