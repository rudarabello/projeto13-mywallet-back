let db;
const client = new MongoClient(process.env.MONGO_URL);
client.connect(() => { db = client.db('dataBank') });