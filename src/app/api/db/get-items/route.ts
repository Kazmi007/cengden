import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(req: any) {
    const client = new MongoClient(process.env.MONGODB_URI ?? '');

    try {
        await client.connect();
        const database = client.db('cengden');

        const collection = database.collection('items');

        const items = await collection.find({}).toArray();

        return NextResponse.json({ items, message: 'Items reterieved successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' })
    } finally {
        await client.close();
    }
}
