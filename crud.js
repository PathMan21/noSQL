const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

async function main() {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db('test');
    const collection = db.collection('users');
  
    const usersToInsert = [
      { name: 'John Doe', age: 25, email: 'john@example.com', createdAt: new Date() },
      { name: 'Jane Smith', age: 30, email: 'jane@example.com', createdAt: new Date() },
      { name: 'Alice Johnson', age: 35, email: 'alice@example.com', createdAt: new Date() }
    ];
    const resultInsert = await collection.insertMany(usersToInsert);
    console.log(`${resultInsert.insertedCount} utilisateurs insérés avec succès.`);
  
    const usersOver30 = await collection.find({ age: { $gt: 30 } }).toArray();
    console.log('Utilisateurs de plus de 30 ans :', usersOver30);
  
    const resultUpdate = await collection.updateMany({}, { $inc: { age: 5 } });
    console.log(`${resultUpdate.modifiedCount} utilisateurs mis à jour avec succès.`);
  
    const resultDelete = await collection.deleteOne({ name: 'John Doe' });
    console.log(`${resultDelete.deletedCount} utilisateur supprimé avec succès.`);
  
   client.close();
  }
  
  main().catch(console.error);
  