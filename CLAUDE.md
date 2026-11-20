# Projet : API REST de livres (cours Docker)

## Contexte
Projet de cours Docker. Je suis débutant : explique-moi chaque fichier et chaque commande
**avant** de les créer ou de les lancer, en français et simplement. Je dois pouvoir
réexpliquer le Dockerfile et le docker-compose au professeur sans aide.

Consignes du cours :
- API REST avec Node.js + Express + MongoDB, thématique : livres
- 1 Dockerfile (pour Node)
- 1 docker-compose (pour MongoDB + Node)
- Dépôt GitHub avec le professeur `rcarlier` en collaborateur (déjà fait)

## Stack et structure
- Node.js 20, Express 5, Mongoose, modules CommonJS (`require`)
- `src/index.js` : serveur Express + connexion MongoDB
- `src/models/Book.js` : schéma Book (title, author requis ; year, genre)
- `src/routes/books.js` : CRUD sur `/books` (GET, GET /:id, POST, PUT /:id, DELETE /:id)
- L'URL de la base vient de `process.env.MONGO_URI`, le port de `process.env.PORT` (3000 par défaut)

## Avancement
- [x] Étape 1 : initialisation du projet (branche `main`)
- [x] Étape 2 : API Express (branche `feature/api-express`)
- [x] Étape 3 : MongoDB (branche `feature/mongodb`)
- [x] Étape 4 : Dockerfile + .dockerignore (branche `feature/dockerfile`)
- [x] Étape 5 : docker-compose.yml (branche `feature/docker-compose`)
- [x] Étape 6 : README avec instructions de lancement et de test (branche `docs/readme`)

## Attendus techniques
- Dockerfile : image `node:20-alpine`, copier `package*.json` avant le code (cache de `npm install`)
- `.dockerignore` : au minimum `node_modules` et `.git`
- docker-compose : deux services nommés `api` et `mongo` (image `mongo:7`),
  `MONGO_URI=mongodb://mongo:27017/books`, volume nommé `mongo-data` sur `/data/db`,
  port 3000 exposé pour l'API
- README : prérequis, lancement (`docker compose up --build`), liste des routes,
  exemples de requêtes

## Git : règles à respecter
- Ne jamais travailler directement sur `main`
- Chaque étape : partir de `main` à jour (`git checkout main && git pull`), créer la branche
  de l'étape, commiter, pousser, puis je fusionne via une Pull Request sur GitHub
- Messages de commit en français, format Conventional Commits :
  - `feat:` fonctionnalité, `chore:` configuration/outillage, `docs:` documentation
  - Exemple : `chore: ajout du Dockerfile et du .dockerignore`
- Demande-moi validation avant chaque commit et chaque push

## Pièges connus sur ma machine
- Une application Next.js occupe parfois le port 3000. Si une requête renvoie du HTML
  avec `_next/static`, ce n'est pas notre API : vérifier avec `lsof -i :3000`.
- Dans un conteneur, `localhost` désigne le conteneur lui-même : utiliser le nom du service
  (`mongo`) dans Compose, ou `host.docker.internal` pour joindre le Mac.