const mongoose = require("mongoose");

const user = 'extcontrolapp';
const pass = 'N0PcbQNWDfmjGkmF';

//const url = "mongodb://172.16.1.167:27017/database";
const url = `mongodb+srv://${user}:${pass}@app.mvtv3jd.mongodb.net/?retryWrites=true&w=majority&appName=app`;

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
