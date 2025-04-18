const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/database";

const connectDB = async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Conexión exitosa a MongoDB");
	} catch (error) {
		console.error("Error conectando a MongoDB:", error);
		process.exit(1);
	}
};

module.exports = connectDB;
