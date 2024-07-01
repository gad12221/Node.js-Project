# Gadi's Project


## Project Overview: Express.js Server with MongoDB
This project features a robust and scalable server built using Express.js, designed to handle user and card data with MongoDB as the storage backend. The server incorporates middleware for logging, error handling, and Cross-Origin Resource Sharing (CORS). It is designed for easy maintenance and expansion, making it suitable for a variety of applications.

## Key Features

### 1. User Management
Registration: Users can sign up by providing necessary details, which are validated and securely stored in the database.
Authentication: Secure user authentication using JSON Web Tokens (JWT).
Password Hashing: Passwords are hashed using bcrypt to ensure security.
User Profile: Allows fetching and updating user profile information.
### 2. Card Management
Create Cards: Users can create new cards with specific attributes.
Read Cards: Retrieve a list of all cards or details of a specific card.
Update Cards: Update information on existing cards.
Delete Cards: Remove cards from the database.
### 3. Database Integration
MongoDB: Utilizes MongoDB for data storage with Mongoose for schema definitions and queries.
### 4. Middleware and Utilities
CORS: Enabled Cross-Origin Resource Sharing using the cors package.
Logging: HTTP request logging with morgan for easier debugging and monitoring.
Environment Variables: Configuration management using dotenv.
### 5. Validation and Error Handling
Input Validation: Ensures data integrity with request data validation using Joi.
Centralized Error Handling: Provides consistent error responses and error logging.
### 6. Dev Experience
TypeScript: Used for type checking and improved code quality.
Chalk: Enhance console output and server start messages.
### 7. Additional Tools
Underscore: Utility library for data manipulation and functional programming.
bcrypt: For secure password hashing.
jsonwebtoken: For JWT-based authentication.



## Installation Instructions

### 1. Install Dependencies: Run npm i to install all required dependencies.

### 2. Set Up Environment Variables: Create a .env file based on the provided .env.example and configure your environment variables.

### 3. Run the Server: Use npm run dev to start the server.

API Documentation: Access API documentation at *http://localhost:8080*.
