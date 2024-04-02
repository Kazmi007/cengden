import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: any,) {
    const { data } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI ?? '');

    try {
        await client.connect();
        const database = client.db('cengden');

        const collection = database.collection('items');

        await collection.insertOne({ data });

        return NextResponse.json({ message: 'Item saved successfully!' });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
}
