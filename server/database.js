const mongoose = require("mongoose");

const url = "mongodb://172.16.1.167:27017/database";
//const url = "mongodb+srv://extcontrolgithub:WhSGoKRTq0BDHuG9@cluster0.fwrdwty.mongodb.net/"

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
