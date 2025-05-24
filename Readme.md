# Books Management API

A RESTful API for managing books, users, and reviews, built with Node.js, Express, and MongoDB.

## API Testing

You can use the provided [Postman collection](./postman-collection/BooksManagment.postman_collection.json) to test all endpoints easily.

## Features

- User authentication (signup, login) with JWT
- Add, retrieve, and search books
- Add, edit, and delete reviews for books
- Secure endpoints with authentication middleware
- Input validation and error handling

## Project Structure

```
.
├── config/           # Configuration files (env variables)
├── controller/       # Route controllers
├── custom-error/     # Custom error classes
├── handler/          # API, error, and validation handlers
├── middleware/       # Express middlewares
├── model/            # Mongoose models
├── routes/           # Express route definitions
├── service/          # Service utilities (JWT, bcrypt)
├── validators/       # Input validation logic
├── server.js         # Entry point
├── package.json
└── .env
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone <repo-url>
   cd books-management
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and set the following variables:

   ```
   MONGODB_URL=mongodb://localhost:27017/booksdb
   PORT=8080
   SALT_ROUNDS=10
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRES_IN=1h
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Auth

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Books

- `POST /api/books` — Add a new book (auth required)
- `GET /api/books` — List all books (with filters)
- `GET /api/books/:id` — Get book details by ID

### Reviews

- `POST /api/books/:id/reviews` — Add a review to a book (auth required)
- `PUT /api/reviews/:id` — Edit a review (auth required)
- `DELETE /api/reviews/:id` — Delete a review (auth required)

### Search

- `GET /api/search?query=...` — Search books by title or author
