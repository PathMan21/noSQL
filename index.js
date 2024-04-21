const express = require('express');
const { MongoClient } = require('mongodb');
const faker = require('faker');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = 'users';

app.use(express.json());

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      name: faker.name.findName(),
      age: faker.random.number({ min: 18, max: 80 }),
      email: faker.internet.email(),
      createdAt: faker.date.past()
    };
    users.push(user);
  }
  return users;
};

app.post('/generate-data', async (req, res) => {
  try {
    const numUsers = req.body.numUsers || 100;
    const users = generateUsers(numUsers);
    
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(users);
    res.json({ message: `${result.insertedCount} utilisateurs insérés avec succès.` });

    client.close();
  } catch (error) {
    console.error('Erreur lors de la génération et insertion des données :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la génération et insertion des données.' });
  }
});


app.post('/edit', async (req, res) => {
    try {
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

       res.status(200).json({ message: 'Opérations CRUD exécutées avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'exécution des opérations CRUD :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'exécution des opérations CRUD.' });
    }
});


app.listen(port, () => {
  console.log(`Serveur MongoDB écoutant sur le port ${port}`);
});
