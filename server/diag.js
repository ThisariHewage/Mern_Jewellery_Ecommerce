import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: 'c:/Users/HP/Desktop/Mern_Jewellery_Ecommerce/server/.env' });

async function run() {
    try {
        console.log('--- DIAGNOSTIC START ---');
        console.log('MONGO_URI length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        if (collections.some(c => c.name === 'products')) {
            const products = await mongoose.connection.db.collection('products').find({}).toArray();
            console.log('Products count:', products.length);
            if (products.length > 0) {
                console.log('First product name:', products[0].name);
            }
        } else {
            console.log('!!! products collection NOT FOUND !!!');
        }

        await mongoose.disconnect();
        console.log('--- DIAGNOSTIC END ---');
    } catch (err) {
        console.error('!!! FATAL ERROR !!!');
        console.error(err);
        process.exit(1);
    }
}

run();
