# No Sql

### Étape 1: Configuration de MongoDB en mode Replica Set

1. **Installation de Docker :** J'ai commencé par installer Docker sur ma machine en suivant les instructions disponibles sur le site officiel de Docker.

2. **Création du fichier `docker compose.Y ml` :** J'ai créé un fichier `docker compose.Y ml` pour définir les services MongoDB Replica Set.

3. **Démarrage du Replica Set :** J'ai exécuté la commande `docker-compose up` dans le dossier contenant le fichier `docker-compose.yml` pour démarrer les services MongoDB Replica Set.

4. **Connexion à la CLI MongoDB :** J'ai utilisé la commande `docker exec -it tpmangodbreplication-mongodb-primary-1 mongosh` pour accéder à la ligne de commande MongoDB.

5. **Vérification de l'état du Replica Set :** Dans la CLI MongoDB, j'ai saisi la commande `rs.status()` pour vérifier l'état du Replica Set. Cependant, j'ai rencontré une erreur de connexion qui nécessite une résolution.
   
### Étape 2: Génération de Fausses données

1/ **On initialise un nouveau projet js** : donc npm install, npm install faker pour générer des données fictives, ainsi qu'express pour gérer la connexion à mongodb et les routes.
2/ **on lance mongodb en parallèle**
3/ **Création du fichier qui servira à créer des utilisateurs et à se connecter** : J'ai créé un dossier generate avec index.js qui contient la connection au serveur mongodb à la database test, avec la collection users.
4/ **On lance le script avec npm start** (qui a été mis sur index.js)

### Étape 3: Manipulations via la CLI MongoDB

1/ **On se reconnecte à la CLI de mongodb**On va se reconnecter à la cli de mongodb avec "docker exec -it tpmangodbreplication-mongodb-primary-1 mongosh"
2/ **Importer du json** : on insère avec la ligne de commande : mongoimport --db test --collection users --file data.json 
3/ **CRUD** Je n'ai pas réussis à éxecuter toutes les opérations CRUD mais voici celles que j'ai réussis :

**Pour insérer** on va utiliser : db.users.insertMany() ou insertOne() par exemple : db.users.insertOne({ "name": "John Doe", "age": 35, "email": "john@example.com", "createdAt": new Date() })
ou db.users.insertMany([
  { "name": "Jane Smith", "age": 28, "email": "jane@example.com", "createdAt": new Date() },
  { "name": "Alice Johnson", "age": 42, "email": "alice@example.com", "createdAt": new Date() },
  { "name": "Bob Brown", "age": 50, "email": "bob@example.com", "createdAt": new Date() }
])
**Delete aussi** : db .users.Delete One({ "nom": "John Doe";)
il faut lui spécifier un critère de sélection pour savoir lequel supprimer

Toutes les opérations CRUD doivent avoir avec db.<le nom de la collection>.<l'opération CRUD>

### Étape 4: Automatisation avec le langage de Programmation de votre choix

1/ **Le script**: On rajoute un endpoint /édit pour faire les changements, directement dans l'index.js
2/ **npm-start**: lance le serveur

## Différences rencontrées :

**Gestion d'erreurs** :

Ce qui m'a été le plus utile, c'est la gestion d'erreur. Le CLI de mongodb donnait pour chaques lignes de commandes une erreur spécifique, alors que le script était plus long à décoder.

**Facilité d'utilisation** :

Je pense que la CLI est plus facile à utiliser, écrire le script cependant peut se retrouver plus facile pour les personnes qui ont un langage préféré, javascript me semblait plus abordable quand j'ai essayé.

### Quelles sont les difficultés que j'ai rencontrées :

j'ai essayé d'utiliser docker sur Windows à plusieurs reprises, mais j'ai eu beaucoup de mal à comprendre. J'ai installé un sous-système Linux (wsl) mais sans succès. Après plusieurs essais, j'ai fini par créer une machine virtuelle avec débina, pour faire le TP.
J'ai aussi beaucoup de retard en docker et dans mongodb que je n'avais jamais utilisé.
