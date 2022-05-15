import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db = null;
const database = process.env.MONGO_DB;
try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    db = mongoClient.db(database);
    console.log(chalk.bold.greenBright(`Connection established! Accessing ${database}...`));
} catch(e) {
    console.log(chalk.bold.redBright(`Error connecting to ${database}!`), e);    
}

export default db;