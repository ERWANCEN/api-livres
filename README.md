# API Livres

API REST de gestion de livres, réalisée dans le cadre du cours Docker.

- **Node.js 20** + **Express 5** pour l'API
- **MongoDB 7** (via **Mongoose**) pour la base de données
- **Docker** et **Docker Compose** pour lancer l'ensemble

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et démarré

Il n'est pas nécessaire d'installer Node.js ni MongoDB : ils tournent dans des conteneurs.

## Lancement

Depuis la racine du projet :

```bash
docker compose up --build
```

- `--build` construit l'image de l'API à partir du `Dockerfile`
- Compose démarre MongoDB, attend qu'il soit prêt, puis démarre l'API
- L'API est disponible sur **http://localhost:3000**

Pour lancer en arrière-plan, ajouter `-d` : `docker compose up --build -d`.

Pour arrêter :

```bash
docker compose down      # arrête et supprime les conteneurs (les données sont conservées)
docker compose down -v   # supprime aussi le volume, donc toutes les données
```

> Si le port 3000 est déjà utilisé par une autre application, vérifier avec `lsof -i :3000`.

## Modèle Book

| Champ    | Type   | Obligatoire |
|----------|--------|-------------|
| `title`  | String | oui         |
| `author` | String | oui         |
| `year`   | Number | non         |
| `genre`  | String | non         |

Les champs `_id`, `createdAt` et `updatedAt` sont ajoutés automatiquement.

## Routes

| Méthode  | Route        | Description              | Réponses                  |
|----------|--------------|--------------------------|---------------------------|
| `GET`    | `/books`     | Liste tous les livres    | 200                       |
| `GET`    | `/books/:id` | Récupère un livre        | 200, 404, 400 (id invalide) |
| `POST`   | `/books`     | Crée un livre            | 201, 400 (champ manquant) |
| `PUT`    | `/books/:id` | Modifie un livre         | 200, 404, 400             |
| `DELETE` | `/books/:id` | Supprime un livre        | 204, 404, 400             |

## Exemples de requêtes

**Créer un livre**

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Le Petit Prince","author":"Antoine de Saint-Exupéry","year":1943,"genre":"Conte"}'
```

La réponse contient l'`_id` du livre créé, à réutiliser dans les requêtes suivantes.

**Lister les livres**

```bash
curl http://localhost:3000/books
```

**Récupérer un livre**

```bash
curl http://localhost:3000/books/<id>
```

**Modifier un livre**

```bash
curl -X PUT http://localhost:3000/books/<id> \
  -H "Content-Type: application/json" \
  -d '{"year":1946}'
```

**Supprimer un livre**

```bash
curl -X DELETE http://localhost:3000/books/<id>
```

**Erreur : champ obligatoire manquant (400)**

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Sans auteur"}'
```

## Architecture Docker

- **`Dockerfile`** : construit l'image de l'API à partir de `node:20-alpine`. `package*.json` est copié avant le code pour que `npm install` soit mis en cache tant que les dépendances ne changent pas.
- **`.dockerignore`** : exclut `node_modules` et `.git` de l'image.
- **`docker-compose.yml`** : deux services.
  - `api` : construit depuis le `Dockerfile`, port 3000 exposé, se connecte à la base via `MONGO_URI=mongodb://mongo:27017/books` (`mongo` est le nom du service sur le réseau Compose).
  - `mongo` : image `mongo:7`, données stockées dans le volume nommé `mongo-data` (monté sur `/data/db`) pour qu'elles survivent à la suppression des conteneurs. Un healthcheck permet à l'API d'attendre que MongoDB soit prêt.

## Structure du projet

```
.
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
└── src
    ├── index.js          # serveur Express + connexion MongoDB
    ├── models/Book.js    # schéma Mongoose
    └── routes/books.js   # routes CRUD /books
```
